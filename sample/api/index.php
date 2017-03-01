<?php

// autoloader for Composer
require 'vendor/autoload.php';

// instantiate Slim
$app = new Slim\App();

// grouping the /api route, see Slim's group() method documentation for more
$app->group('/api', function () use ($app) {

    $app->get('/config', function ($request, $response, $args) {
        return $response->withJson([
            'title' => "Config Wrapper API Title!!"
            'strap' => "And here's the strapline!"
        ]);
    });

});

$app->run();