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
    //console.log("Logging in...");
    generalfun('login',o) 
  } )

program
  .command('title')
  .alias('st')
  .description('searching title by titleid')
  .option('-t, --titleID [titleid]', 'TitleID')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { generalfun('title',o) } )

program
  .command('newtitles')
  .description('upload title basics')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (o) => {
    //console.log(o);
    upload_route.uploadtsvs(o,"newtitles",null);
  });

program
  .command('newakas')
  .description('upload akas info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newakas",null);
  });

program
  .command('newnames')
  .description('upload new namebasics tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newnames",null);
  });


program
  .command('newcrew')
  .description('upload akas info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newcrew",null);
  });

program
  .command('newepisode')
  .description('upload new episodeinfo tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newepisode",null);
  });

program
  .command('newprincipals')
  .description('upload new principals info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newprincipals",null);
  });

program
  .command('newratings')
  .description('upload new principals info tsv')
  .option('-upl,--filename [filepath]','FilePath')
  .action(async (filepath) => {
    //console.log(filepath);
    upload_route.uploadtsvs(filepath,"newratings",null);
  });

program
  .command('user')
  .description('searching user by username')
  .option('--username [username]', 'Username')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('user',o)
  } )

program
  .command('name')
  .description('searching name by nameid')
  .option('--nameid [nameid]', 'NameID')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('name',o)
  } )

program 
  .command("healthcheck")
  .description("Check the health of the server")
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action(function(o){
    //console.log("parameters are ",o);
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
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('searchtitle',o) 
  } )

program
  .command('bygenre')
  .description('searching title by genre and other filters')
  .option('--genre [genre]', 'Genre')
  .option('--min [minrating]', 'Minimum Rating')
  .option('--from [yrFrom]', 'Year From')
  .option('--to [yrTo]', 'Year To')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('bygenre',o) 
  } )

program
  .command('searchname')
  .description('searching contributor by a part of the name')
  .option('--name [namepart]', 'NamePart')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('searchname',o) 
  } )

  program
  .command('adduser')
  .description('adduser by username or update password if exists')
  .option('--username [username]', 'NamePart')
  .option('--password [password]', 'Password')
  .option('--format [format]', 'Output format (e.g., json, csv)')
  .action( function(o) { 
    generalfun('adduser',o) 
  } )

program.parse(process.argv);
