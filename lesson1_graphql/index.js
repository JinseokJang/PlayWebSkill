// https://medium.com/@kiyeopyang/%EA%B0%80%EC%9E%A5-%ED%98%84%EB%8C%80%EC%A0%81%EC%9D%B8-%EC%9B%B9%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%9E%90-3%ED%8E%B8-graphql-cb69ce1a64b5
const express = require("express");
const graph = require("express-graphql");
const {makeExecutableSchema} = require('graphql-tools');
const Posts = require('./posts.json');
const Writers = require('./writers.json');

const app = express();

// GraphQL api endpoint
app.use('/graphql',graph({
    schema:makeExecutableSchema({
        typeDefs:`
            type Post{
                id: ID!,
                title:String,
                body:String
            }
            type Writer{
                id: ID!,
                name:String,
                posts:[Post]
            }
            type Query{
                Posts:[Post],
                Post(id:ID):Post
                Writers:[Writer],
                Writer(id:ID):Writer
            }
            type Mutation{
                writePost(writerId:ID,title:String,body:String) :Post
            }
        `,
        // excute function 
        resolvers:{
            Query:{
                Posts:()=>Posts,
                Post:(_,{id})=>Posts.find(o => String(o.id)===id),
                Writers:()=>Writers,
                Writer:(_,{id})=>Writers.find(o=>String(o.id)===id)
            },
            Writer:{
                id:o=>o.id,
                name:o=>o.name,
                posts:o=>Posts.filter(post => o.posts.includes(post.id))
            },
            Post:{
                id:o =>o.id,
                title:o=>o.title,
                body:o=>o.body
            },
            Mutation:{
                writePost:(_,{writerId,title,body}) =>{
                    const id = Posts.length+1;
                    const post = {
                        id,
                        title,
                        body,
                    };
                    Posts.push(post);
                    Writers.find(o=> String(o.id) === writerId).posts.push(id);
                    return post;
                }
            }
        }
    }),
    graphiql:true
}))

app.listen(4000,(req,res)=>{
});

