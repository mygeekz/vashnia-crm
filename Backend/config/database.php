<?php
return [
    'driver'   => 'mysql',
    'host'     => getenv('DB_HOST'),
    'port'     => getenv('DB_PORT'),
    'dbname'   => getenv('DB_NAME'),
    'username' => getenv('DB_USER'),
    'password' => getenv('DB_PASS'),
    'charset'  => getenv('DB_CHARSET'),
];
