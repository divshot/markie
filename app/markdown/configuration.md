# Configuration Reference

Your application is configured by a `divshot.json` file in the project root directory. The following are the available configuration options:

#### **name**
The Divshot.io application name. This is the same as your application's subdomain (e.g. `myapp.divshot.io`).

#### **root**
This is the directory that will serve as the public root. If your application uses preprocessors or any otherkind of build process, you will likely want to specify this option (for example `_site` or `public`).

#### **clean_urls**
If true, Divshot.io will automatically drop `.html` extensions from your files. For more information see the [routing guide](/guides/routing).

#### **routes**
You can specify custom routes by passing a map of paths and filenames. See [the routing guide](/guides/routing) for more information.

#### **cache_control**
A map of paths to the length of time (in seconds) that they should be cached by the CDN and the browser. By default all Divshot.io requests are cached until a new deploy on the CDN, and for one hour in the browser. For more information see the [performance guide](/guides/performance).

#### **error_page**
The path (relative to the `root` directory) to a document to display when a page is missing or there is an error. You can also specify an external URL that will be used instead.

#### **exclude**
Exclude allows you to ignore certain files that you don't want to be served, for example `Gruntfile.js`. Simply add an array of file globs to exclude.