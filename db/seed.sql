create table users(
    id serial primary key,
    username varchar(20),
    password text,
    profile_pic text
)

create table posts(
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int references users(id)
)