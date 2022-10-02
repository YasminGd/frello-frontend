import { MassagePreview } from "./massage-preview"

export const MassageList = ({massages}) => {
    return <section className="massage-list">
        {
            massages?.map(massage => <MassagePreview massage={massage}/>)
        }
    </section>
}