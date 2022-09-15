import { TaskList } from './task-list.jsx'

export const GroupPreview = ({ group }) => {
    console.log(group);
    return <section className="group-preview">
        <section className="group-title">
            <p>{group.title}</p>
        </section>
        <TaskList tasks={group.tasks} />
        <button className="add-task-button">
        Add a card
      </button>
    </section>
}