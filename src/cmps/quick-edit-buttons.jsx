import { useRef } from 'react'
import { BsPerson, BsCheck2Square, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'

export const QuickEditButtons = ({ onOpenActionModal }) => {

    // Refs for action modal position calculation
    const btnAttachmentRef = useRef()
    const btnMembersRef = useRef()
    const btnLabelsRef = useRef()
    const btnChecklistRef = useRef()
    const btnDatesRef = useRef()
    const btnCoverRef = useRef()

    const actionBtns = [
        {
            type: 'Open card',
            ref: btnMembersRef,
            iconCmp: <BsPerson className="icon" />,
        },
        {
            type: 'Edit labels',
            ref: btnLabelsRef,
            iconCmp: <AiOutlineTag className="icon" />,
        },
        {
            type: 'Change members',
            ref: btnMembersRef,
            iconCmp: <BsPerson className="icon" />,
        },
        {
            type: 'Change cover',
            ref: btnDatesRef,
            iconCmp: <AiOutlineClockCircle className="icon" />,
        },
        {
            type: 'Remove task',
            ref: btnAttachmentRef,
            iconCmp: <ImAttachment className="icon" />,
        },
    ]

    return (
        <section className="quick-edit-buttons">
            <h3 className="sidebar-title">Add to card</h3>

            {actionBtns.map(btn => (
                <button className=""
                    onClick={() => onOpenActionModal(btn.type, btn.ref)}
                    key={btn.type}
                    ref={btn.ref}>
                    {btn.iconCmp}
                    {btn.type}
                </button>
            ))}
        </section>
    )
}