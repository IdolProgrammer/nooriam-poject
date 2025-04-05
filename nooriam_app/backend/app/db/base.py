from typing import Dict, Any

users_db: Dict[str, Dict[str, Any]] = {}
user_counter = 0


def get_user(email: str):
    """
    Get a user by email.
    """
    if email in users_db:
        return users_db[email]
    return None


def add_user(email: str, hashed_password: str):
    """
    Add a new user to the database.
    """
    global user_counter
    user_counter += 1
    
    user_data = {
        "id": user_counter,
        "email": email,
        "password": hashed_password,
    }
    users_db[email] = user_data