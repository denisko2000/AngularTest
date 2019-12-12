import './albums.scss';
import musicList from './musicList.html';
import editAlbumTemp from './editAlbumTemp.html';
function albums(aState, $mdDialog) {
    let ctrl = this;
    ctrl.albums = aState.getState();
    ctrl.showPrompt = function (ev) {
        let editAlbumCtrl = ($scope)=>{
            $scope.album=ctrl.albums[ctrl.index];
            $scope.save = ()=>{
                $mdDialog.cancel();
                aState.setTotalStateAlbum(ctrl.albums);
            }
        }
        $mdDialog.show({
            controller: editAlbumCtrl,
            template: editAlbumTemp,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        })
        .then(function (answer) { }, function () { });
    };
    ctrl.deleteDialog = function (ev) {
        let confirm = $mdDialog.confirm()
            .title('Would you like to delete your album?')
            .textContent('This album will be permanently deleted')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(() => {
            ctrl.albums.splice(ctrl.index, 1);
            aState.setTotalStateAlbum(ctrl.albums);
        }, () => { });
    };
    ctrl.showMusicList = function (ev) {
        $mdDialog.show({
            controller: ctrl.musicListCtrl,
            template: musicList,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        })
            .then(function (answer) { }, function () { });
    };
    ctrl.musicListCtrl = function ($scope) {
        $scope.item = ctrl.item;
        $scope.edits = [];
        for (let index = 0; index < $scope.item.length; index++) {
            $scope.edits[index] = false;
        }
        $scope.name = '';
        $scope.link = '';
        $scope.add = () => {
            if ($scope.name != '' && $scope.link != '') {
                ctrl.albums[ctrl.index].movies.push({
                    name: $scope.name,
                    link: $scope.link,
                    $$hashKey: Math.random(),
                });
                aState.setTotalStateAlbum(ctrl.albums);
            }
        }
        $scope.close = () => {
            $mdDialog.cancel();
        }
        $scope.delete = (index) => {
            ctrl.albums[ctrl.index].movies.splice(index, 1);
            aState.setTotalStateAlbum(ctrl.albums);
        }
        $scope.edit = (ev, index) => {
            $scope.edits[index] = true;
        }
        $scope.save = (index) => {
            $scope.edits[index] = false;
            aState.setTotalStateAlbum(ctrl.albums);
        }
    }
};
import template from './albums.html';
import module from '../../module/module';
module.component('albums', {
    bindings: {
        item: '=',
        index: '=',
        albums: '='
    },
    controller: ['aState', '$mdDialog', albums],
    template: template
});