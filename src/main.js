import module from './module/module';
import './core/albumState';
import './ctrl/ctrl';
import './components/home/home';
import './main.scss';
module.config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            template: '<home></home>',
        })
})

