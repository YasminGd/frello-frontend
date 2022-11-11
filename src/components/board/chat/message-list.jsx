import { MessagePreview } from "./message-preview"

export const MessageList = ({ messages }) => {
    return <section className="message-list">
        {
            messages?.map((message, idx) => <MessagePreview key={idx} message={message} />)
        }
    </section>
}