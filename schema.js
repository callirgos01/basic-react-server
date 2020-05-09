import axios from 'axios';
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

// Launches TYpe
const QueueType = new GraphQLObjectType({
    name: 'Queue',
    fields: () => ({
        version: {type: GraphQLString},
        speed: {type: GraphQLString},
        status: {type: GraphQLString},
        slots: {type: new GraphQLList(QueueSlotType)}
    })
});

const QueueSlotType = new GraphQLObjectType({
    name: 'QueueSlot',
    fields: () => ({
        index: {type: GraphQLInt},
        filename: {type: GraphQLString},
        cat: {type: GraphQLString},
        status: {type: GraphQLString},
        percentage: {type: GraphQLString}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        queue: {
            type: QueueType,
            async resolve(parent, args) {
//                var resp = await axios.get('https://callirgos.net/downloader/api?output=json&apikey=9f5509492dcad6e060f7f261004d774e&mode=queue');
                console.log('axios get');
                var resp = await axios.get('https://callirgos.net/downloader/api', {
                    params:{
                        output: 'json',
                        apikey: '9f5509492dcad6e060f7f261004d774e',
                        mode: 'queue'
                    }
                });
                console.log(resp.data.queue);
                return resp.data.queue;
            }
        }
    }
});

 module.exports = new GraphQLSchema({
    query: RootQuery,
 });
