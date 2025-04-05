from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.schemas import Token, User, UserCreate
from app.db.base import get_user, add_user
from app.services.websocket import manager
from app.api.deps import get_current_user

router = APIRouter()


# Registration
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=dict)
async def register_user(user: UserCreate) -> Any:
    """
    Register a new user.
    """
    if get_user(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    hashed_password = get_password_hash(user.password)
    add_user(user.email, hashed_password)

    await manager.broadcast_json({
        "type": "new_user",
        "email": user.email
    })
    
    return {"email": user.email}

# Token Generation
@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    Get an access token for future requests.
    """
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user["email"], expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# User Profile
@router.get("/profile", response_model=User)
async def read_users_me(
    current_user: dict = Depends(get_current_user)
) -> Any:
    """
    Get current user information.
    """
    return current_user 