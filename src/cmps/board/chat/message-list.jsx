import { MessagePreview } from "./message-preview"

export const MessageList = ({ messages }) => {
    return <section className="message-list">
        {
            messages?.map(message => <MessagePreview key={message.msg} message={message} />)
        }
    </section>
}