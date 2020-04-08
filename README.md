# Travello

Travello is an app that will help a user to plan trips and enable them to see all the information in well organized form.

## User Flow Diagram

![User Flow Diagram](userFlow.png)

## Database schema

- Database contains one table which include basic details about a travel, to keep it as straightforward as possible. Later on the schema may be changed to group related fields in separate tables and also contain more column with more details about trip from user.

This schema shows what kind of user input I was planning to get at the beginning.

![Image of extended database schema](databaseSchema.jpg)

Schema below is the actual one I was working on, to simplyify even more.

![Image of database schema](databaseSchema.png)

## API routes plan

![Image of API routes](apiRoutesSchema.png)

## Used technologies

1. MySQL - database
2. Express - to create server and API routes
3. Node.js - to run the server
4. React - Front-end
5. Bootstrap - styling 

## Dependencies 

1. Run yarn install in project directory. This will install server's project dependencies such as Express.
2. cd client and yarn install. This will install clientdependencies (React). 

## Future features

1. Display only travel destination and date (and some grafic) after user click the box all details will be revield
2. Sort trips by date (upcoming first)
3. Log in form
4. Map for individual trip to show location of hotel, car rental etc.
5. User can create wish list/ bucket list/ travel inspirations

## Credit

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._