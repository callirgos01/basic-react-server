import React from 'react';
import gql from 'graphql-tag';
import SlotItem from './SlotItem';
import { useQuery } from '@apollo/react-hooks';

const QUEUE_QUERY = gql`
    query QueueQuery {
        queue {
            status
            speed
            version
            slots {
                index
                status
                cat
                filename
                percentage
            }
        }
    }
`;
//export class Queue extends Component {
const Queue: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(QUEUE_QUERY);
    if (loading) return <h1>'Loading...'</h1>;
    if (error) return <h4> {`Error! ${error.message}`}</h4>;
    return(
            <div>
                <h1 className="display-4 my-3">Queue</h1>
                    <h1> { data.queue.version } </h1>
                    {
                        data.queue.slots.map(slot =>(
                            <SlotItem key = {slot.index} slot={slot}/>
                        ))
                    }
            </div>
        )
}

export default Queue;
