#!/usr/bin/env node
// cli/yourCLIFile.js
const program = require('commander');
const upload_route = require('./src/uploadtsvfile');
const generalfun = require('./src/general_function');

program
  .version('0.0.1')
  .description('Your CLI Application')
  .action(() => {
    console.log('Welcome to the CLI Application');
    console.log('Type se2333 --help for a list of commands');
  });
  
program
  .command('format')
  .description('Learn the format of a command')
  .action(() => {
    console.log('Format of a command: se2333 scope --param1 value1 [--param2 value2] --format fff');
  });

program
  .command('login')
  .alias('lin')
  .description('User/Admin log in')
  .option('-u, --username [username]', 'Username')
  .option('-p, --password [password]', 'Password')
  .action( function(o) { 
    console.log("Logging in...");
    generalfun('login',o) 
  } )

program
  .command('title')
  .alias('st')
  .description('searching title by titleid')
  .option('-t, --titleID [titleid]', 'TitleID')
  .action( function(o) { generalfun('title',o) } )

program
  .command('newtitles')
  .description('upload title basics')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"titlebasics");
  });

program
  .command('newakas')
  .description('upload akas info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"titleakas");
  });

program
  .command('newnames')
  .description('upload new namebasics tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"namebasics");
  });


// program
//   .command('newcrew')
//   .description('upload akas info tsv')
//   .option('-upl,--filename [filepath]','FilePath')
//   .action(async (filepath) => {
//     console.log(filepath);
//     uploadtitlebasics_route.uploadtitlebasics(filepath);
//   });

program
  .command('newepisode')
  .description('upload new episodeinfo tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"titleepisode");
  });

program
  .command('newprincipals')
  .description('upload new principals info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"titleprincipals");
  });

program
  .command('newratings')
  .description('upload new principals info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    console.log(filepath);
    upload_route.uploadtsvs(filepath,"titleratings");
  });

program
  .command('user')
  .description('searching user by username')
  .option('--username [username]', 'Username')
  .action( function(o) { 
    generalfun('user',o)
  } )

program
  .command('name')
  .description('searching name by nameid')
  .option('--nameid [nameid]', 'NameID')
  .action( function(o) { 
    generalfun('name',o)
  } )

program 
  .command("healthcheck")
  .description("Check the health of the server")
  .action(function(o){
    console.log("parameters are ",o);
    generalfun('healthcheck',o);
  })
program
  .command('resetall')
  .description('Reset all tables')
  .action(function(o) {
    generalfun('resetall',o);
  })

program
  .command('searchtitle')
  .description('searching title by a part of the title')
  .option('--titlepart [titlepart]', 'TitlePart')
  .action( function(o) { 
    generalfun('searchtitle',o) 
  } )


program.parse(process.argv);
