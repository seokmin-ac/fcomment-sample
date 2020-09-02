import React, { createContext, useState } from "react"

const AuthContext = createContext({
  jwt: "",
  setJwt: () => {},
})

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState("")
  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthProvider }
