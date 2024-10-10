module.exports = configure(function (/* ctx */) {

        return {
            extras: [
                'bootstrap-icons',
                'material-icons',
                'fontawesome-v6'
            ],
            framework: {
                config:{},
                iconSet: 'material-icons',
                components: [
                    'QInput',
                    'QIcon',
                ],
                plugins: ['Notify']
            },
            css: [
                'styles.css',
                'bootstrap-icons/font/bootstrap-icons.css',
            ],
        }
    }
)
