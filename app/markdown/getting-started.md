# Getting Started with Divshot.io

**Note:** You must have a Divshot account to use hosting features. Want to get started? Just head over and [register today](http://auth.divshot.com/register)!

## Step 1: Install Node.js and the Divshot Command-Line Interface

Divshot.io uses Node.js to provide command-line tool integration. First, you'll need to [download and install Node.js](http://nodejs.org/download/) following the instructions for your platform. Next, you'll need to install the Divshot command-line interface:

    npm install -g divshot-cli
    
Now you'll also need to login to the Divshot CLI to be able to use it:

    divshot login
    
## Step 2: Create an Application

Next you'll need to create a Divshot.io application. In an empty folder, run this:

    divshot init
    
This will prompt you for some basic application information such as app name and create a `divshot.json` file that will reside in the root of your project directory. Once you have entered the information you will be asked if you wish to create an application. Answer in the affirmative and you'll be up and running!

## Step 3: Release Code to an Application

Now you just need some content! It's simple to test out the deployment process:

    echo "<h1>Hello World</h1>" > index.html
    divshot push
    
The `push` command will publish to the `development` environment by default. After the release command completes, you should be able to visit your application at `http://development.your-app-name.divshot.io`.

That's all it takes to get started with Divshot.io! If you have any questions, please [send us a note](mailto:support@divshot.com) and we'll do our best to help.