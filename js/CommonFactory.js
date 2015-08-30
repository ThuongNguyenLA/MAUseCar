
var SystemService = function ($rootScope, $timeout, $location) {
    var service = {};
    var fail = function (error) {
        alert("ReadFile - fail error.code=" + error.code, error.toString(), '');
    }
    service.ReadContentFile = function (path, datatype, callback) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, null, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        callback(evt.target.result);
                    };
                    if (datatype == 2) {//base64
                        reader.readAsDataURL(file);
                    }
                    else//text
                    {
                        reader.readAsText(file);
                    }
                }
                , function (error) {
                    callback(null);
                    alert(error);
                    //   ErrorLogService.AddErrorLocal("ReadFile1 - fail error.code=" + error.code, error.toString(), '');
                });
            }, function (error) {
                callback(null);
                alert(error);
                //ErrorLogService.AddErrorLocal("ReadFile2 - fail error.code=" + error.code, error.toString(), '');
            });

        }, function (error) {
            callback(null);
            ErrorLogService.AddErrorLocal("ReadFile3 - fail error.code=" + error.code, error.toString(), '');
        });
    }
    service.DeleteFile = function (path) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, null, function (fileEntry) {
                fileEntry.remove(function (success) {
                }, function (error) {
                    //  ErrorLogService.AddErrorLocal("CommnonService - deleteimagefail", error.responseText, '');
                });
            });

        }, fail);
    }

    service.CreateFile = function (callback) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getDirectory("Thuong", { create: true }, function (dirEntry) {
                var imagefilename = "test";

                dirEntry.getFile(imagefilename, {
                    create: true, exclusive: false
                }, function (fileEntry) {
                    fileEntry.createWriter(function (writer) {
                        writer.onwrite = function (evt) {
                            callback(true);
                        };
                        //var json = JSON.stringify();
                        writer.write("thuong");
                    }, function (evt) {
                        alert(evt);
                        callback(false);
                    });

                }, fail);

            });

        }, fail);
    }

    //////////////////////////////////////

    service.readFile = function () {

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile("myReadme.txt", null, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        debugger;
                        //callback(evt.target.result);
                        alert(evt.target.result);
                    };

                    debugger;
                    reader.readAsText(file);

                }
                , function (error) {
                    callback(null);
                    alert(error);

                });
            }, function (error) {
                callback(null);
                alert(error);

            });

        }, function (error) {
            callback(null);

        });
    }
    service.writeFile = function () {
        myFile1 = "myReadme.txt";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        function gotFS(fileSystem) {
            debugger;
            fileSystem.root.getFile(myFile1, { create: true, exclusive: false }, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            debugger;
            fileEntry.createWriter(function (writer) {
                writer.onwrite = function (evt) {
                    //callback(true);
                    //writer.write("thuong ne\n");
                };
                //var json = JSON.stringify();
               writer.write("thuong dung\n");
            }, function (evt) {
                debugger;
                alert(evt);
                //  callback(false);
            });

            alert(fileEntry);
        }

        function fail(error) {
            alert("Error");
        }
    }
    service.deleteF = function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile("myReadme.txt", null, function (fileEntry) {
                fileEntry.remove(function (success) {
                    alert("thanh cong");
                }, function (error) {
                    alert("loi");

                });
            });

        }, function (error) { alert('s') });
    }
    return service;
}