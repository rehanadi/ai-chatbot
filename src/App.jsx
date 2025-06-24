import { useEffect, useState } from "react"
import ChatBotStart from "./components/ChatBotStart"
import ChatBotApp from "./components/ChatBotApp"
import { v4 as uuidv4 } from "uuid"

const App = () => {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || []
    setChats(storedChats)

    if (storedChats.length > 0) {
      const lastChat = storedChats[0]
      setActiveChat(lastChat.id)
    }
  }, [])

  const handleStartChat = () => {
    setIsChatting(true)

    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  const createNewChat = (initialMessage = "") => {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString(
        "en-GB"
      )} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage
        ? [
            {
              type: "prompt",
              text: initialMessage,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]
        : [],
    }

    const updatedChats = [newChat, ...chats]
    setChats(updatedChats)
    localStorage.setItem("chats", JSON.stringify(updatedChats))

    setActiveChat(newChat.id)
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages))
  }

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}

export default App
