

const resolvers = {
    Query: {
        hello: () => {
            return "Hello World";
        },
        courses: () => {
            return [{id: 1, name: "math", ects: 2, spots: 15 }, {id: 2, name: "science", ects: 2, spots: 15 }, {id: 3, name: "english", ects: 2, spots: 30 }]
        }
    },

    Mutation: {
        addRanking: (parent, args)=> {
            console.log("Received ", args);
            return true;
        }
    }
};

module.exports = resolvers;