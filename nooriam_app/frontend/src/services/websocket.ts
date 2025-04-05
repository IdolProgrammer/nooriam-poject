let socket: WebSocket | null = null;
let messageHandlers: ((data: any) => void)[] = [];

export const connectWebSocket = () => {
  if (socket) {
    socket.close();
  }
  
  socket = new WebSocket('ws://localhost:8000/ws');
  
  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      messageHandlers.forEach(handler => handler(data));
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  socket.onclose = () => {
    console.log('WebSocket connection closed');
    setTimeout(() => {
      connectWebSocket();
    }, 5000);
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    socket?.close();
  };
};

export const registerMessageHandler = (handler: (data: any) => void) => {
  messageHandlers.push(handler);
  return () => {
    messageHandlers = messageHandlers.filter(h => h !== handler);
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
