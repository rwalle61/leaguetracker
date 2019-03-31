# leaguetracker

A backend server to track players' matches in a league.

Access at https://leaguetracker.appspot.com/ (or by running `npm run browse` from within the directory)

## Development
Run locally using `npm start`

Run locally via nodemon using `npm run dev`

Test using `npm test`

Re-deploy (via [Google Cloud Platform App Engine](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart)) using `npm run deploy`. (Uses the `gcloud` command-line tool and `app.yaml`. You will need permissions granted through [IAM in the App Engine console](https://console.cloud.google.com/iam-admin/iam?project=leaguetracker))
