import {
    ReactNode,
    createContext,
    useMemo,
    useState,
    useContext,
    useCallback,
  } from "react";
  

  import axiosWithConfig from "@/utils/apis/axiosWithConfig";
  
  interface Context {
    token: string;
    changeToken: (token?: string) => void;
  }
  
  interface Props {
    children: ReactNode;
  }
  
  const contextValue = {
    token: "",
    changeToken: () => {},
  };
  
  const TokenContext = createContext<Context>(contextValue);
  
  export function TokenProvider({ children }: Readonly<Props>) {
  
    const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  
    axiosWithConfig.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          changeToken();
        }
  
        return Promise.reject(error);
      }
    );
  
    const changeToken = useCallback(
      (newToken?: string) => {
        setToken(newToken || "");
        if (newToken) {
          localStorage.setItem("token", newToken);
        } else {
          localStorage.removeItem("token");
        }
      },
      []
    );
  
    const tokenContextValue = useMemo(
      () => ({
        token,
        changeToken,
      }),
      [token, changeToken]
    );
  
    return (
      <TokenContext.Provider value={tokenContextValue}>
        {children}
      </TokenContext.Provider>
    );
  }
  
  export function useToken() {
    const context = useContext(TokenContext);
  
    if (context === undefined) {
      throw new Error("ERROR, useToken must be used within TokenContext");
    }
  
    return context;
  }
  