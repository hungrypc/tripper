# React + Rails Trip Planning App

A remake of my Lighthouse Labs final project (wander), an app that allows users to collaborate when planning a trip together.

## Running the app

You need **TWO** terminals for this.

In one terminal, run `bin/rails s` to run the server.

In the other terminal, `cd` into `client`. Then run `npm start` and go to `localhost:3000` in your browser.

## below is extra info from the boilerplate I forked to make this

Courtesy of Nima (nima@lighthouselabs.com).

### Deployment to Heroku

This boilerplate is _almost_ all set up to deal with deploying to Heroku. If you have the Heroku CLI tools installed you can run `heroku create` to create the Heroku project.

Then we must run two commands to tell Heroku to first build our React app, and _then_ build the Rails app.

1. `heroku buildpacks:add heroku/nodejs --index 1`
2. `heroku buildpacks:add heroku/ruby --index 2`

Once you've done that, you can run `git push heroku master` to deploy your project any time you want! Note, however, that deploying to Heroku can be a _little_ slow since Heroku needs to build your React app. Just give it some time.

Once it's deployed, you can run the following commands to manage your app:

- `heroku run rake db:schema:load` to set up your database the first time
- `heroku run rake db:migrate` for any additional migrations
- `heroku run rake db:seed` for seeds
- `heroku run rake db:rollback` to rollback a migration

There are other commands, but these are good to get you started!

To make your app work properly with React Router (if you end up using it) on Heroku, I've added a special route to the `routes.rb` file (`get '*path' ... `).

### Contact

Please contact me at `nima@lighthouselabs.com` if you have any questions or requests, or post an issue to this repo.