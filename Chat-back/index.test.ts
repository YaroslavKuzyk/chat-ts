import WebSocket from "ws";

describe("broadcastMessage", () => {
  it("should send message to all clients", () => {
    const mockClient1 = { send: jest.fn() };
    const mockClient2 = { send: jest.fn() };
    const mockWebSocketServer = {
      clients: [mockClient1, mockClient2],
      forEach: (cb: any) => {
        [mockClient1, mockClient2].forEach(cb);
      },
    } as unknown as WebSocket.Server;
    const mockMessage = "test message";

    mockWebSocketServer.clients.forEach((client: any) => {
      client.send(JSON.stringify(mockMessage));
    });

    expect(mockClient1.send).toHaveBeenCalledWith(JSON.stringify(mockMessage));
    expect(mockClient2.send).toHaveBeenCalledWith(JSON.stringify(mockMessage));
  });
});
