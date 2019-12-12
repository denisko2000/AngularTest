import './home.scss';
import '../albums/albums';
import createAlbumTemplate from './createAlbumTemplate.html';
function home(aState,$mdDialog) {
    let ctrl = this;
    ctrl.albums = aState.getState();
    ctrl.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: ctrl.createAlbumCtrl,
          template: createAlbumTemplate,
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: false
        })
        .then(function(answer) {}, function() {});
      };
      
    ctrl.createAlbumCtrl = function($scope){
        $scope.name='';
        $scope.descript='';
        $scope.add = function(){
            if($scope.name!=''&&$scope.descript!=''){
            ctrl.albums.push({
                name:$scope.name,
                description:$scope.descript,
                $$hashKey:Math.random(),
                movies:[]
            })
            aState.setTotalStateAlbum(ctrl.albums);
            $mdDialog.cancel();
           }
       } 
    };
   
  
};

import template from './home.html';
import module from '../../module/module';
module.component('home', {
    bindings: {
     
    },
    controller: ['aState','$mdDialog', home],
    template: template
});