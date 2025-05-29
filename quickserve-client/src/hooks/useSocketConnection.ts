import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsWsConnected } from "../store/slices/appSlice";
import { socket } from "../config/socket";
import { RootState } from "../store/store";

export const useSocketConnection = () => {
  const isWsConnected = useSelector(
    (state: RootState) => state.app.isWsConnected
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const onConnect = () => {
      dispatch(setIsWsConnected(true));
      console.log("Connected to WebSocket server");
    };
    const onDisconnect = () => {
      dispatch(setIsWsConnected(false));
      console.log("Disconnected from WebSocket server");
    };
    const onError = (error: Error) => {
      console.error("WebSocket error:", error);
    };

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("error", onError);
      socket.disconnect();
    };
  }, [dispatch]);

  return { socket, isWsConnected };
};
