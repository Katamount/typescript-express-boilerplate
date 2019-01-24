import * as appRoot from 'app-root-path';

export const logger_conf = {
    "file": {
        "level": "info"
        , "filename": `${appRoot}/logs/app.log`
        , "handleExceptions": true
        , "json": true
        , "maxsize": 5242880 // 5MB
        , "maxFiles": 5
      }
    , "console": {
      "level": "debug"
    }
}