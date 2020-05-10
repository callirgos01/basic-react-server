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
                let apiEntryPoint = 'https://callirgos.net/downloader/api';
                let output = 'json';
                let apikey = '9f5509492dcad6e060f7f261004d774e';
                let mode = 'queue';
                let timeout = 1000;
                try {
                    var resp = await axios.get(apiEntryPoint, {
                        params:{
                            output,
                            apikey,
                            mode
                        },
                        timeout
                    });
                    //console.log(resp.data.queue);
                    return resp.data.queue;     
                } catch(error) {
                    //console.log("error");
                    console.error(error);
                }
            }
        }
    }
});

 module.exports = new GraphQLSchema({
    query: RootQuery,
 });
