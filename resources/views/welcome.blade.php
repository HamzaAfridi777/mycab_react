<!html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>MyCAB</title>
        <meta
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
            name="viewport"
        />
        <link rel="stylesheet" href="{{url('storage/bootstrap/css/bootstrap.min.css')}}" />
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
        />
        <link
            rel="stylesheet"
            href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <link rel="stylesheet" href="{{url('storage/dist/css/AdminLTE.min.css')}}" />
        <link rel="stylesheet" href="{{url('storage/dist/css/skins/_all-skins.min.css')}}" />
        <link rel="stylesheet" href="{{url('storage/plugins/iCheck/flat/blue.css')}}" />
        <link rel="stylesheet" href="{{url('storage/plugins/morris/morris.css')}}" />
        <link
            rel="stylesheet"
            href="{{url('storage/plugins/jvectormap/jquery-jvectormap-1.2.2.css')}}"
        />
        <link
            rel="stylesheet"
            href="{{url('storage/plugins/datepicker/datepicker3.css')}}"
        />
        <link
            rel="stylesheet"
            href="{{url('storage/plugins/daterangepicker/daterangepicker-bs3.css')}}"
        />
        <link
            rel="stylesheet"
            href="{{url('storage/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css')}}"
        />
        <link
            rel="stylesheet"
            href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css"
        />
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <!-- <script defer="defer" src="/static/js/main.1f890592.js"></script>
        <link href="/static/css/main.605f50b3.css" rel="stylesheet" /> -->
    </head>
    <body
        class="skin-blue sidebar-mini wysihtml5-supported"
        style="background-color: #cacaca"
    >

    
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="app"></div>
        <script
            src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"
        ></script>
        <script src="{{ asset('frontend/build/theme/dist/js/app.js') }}"></script>
        <script src="theme/bootstrap/js/bootstrap.min.js"></script>
        <script src="theme/plugins/iCheck/icheck.min.js"></script>
        <script src="theme/dist/js/jquery.slimscroll.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
        <script src="../../boer_components/fastclick/lib/fastclick.js"></script>
        <script src="../../dist/js/adminlte.min.js"></script>
        <script src="../../dist/js/demo.js"></script>
        <script></script>
        <script>
            $(document).ready(function () {
                $("#example1").DataTable(),
                    $("#example2").DataTable({
                        paging: !0,
                        lengthChange: !1,
                        searching: !1,
                        ordering: !0,
                        info: !0,
                        autoWidth: !1,
                    });
            }),
                $(function () {
                    $("input").iCheck({
                        checkboxClass: "icheckbox_square-blue",
                        radioClass: "iradio_square-blue",
                        increaseArea: "20%",
                    });
                });
        </script>
    </body>
</html>
