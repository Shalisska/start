module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		less: {
			style: {
				files: {
					'css/style.css' : ['less/style.less']
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 10']
			},
			style: {
				src: 'css/style.css'
			}
		},
		cmq: {
			style: {
				files: {
					'css/style.css' : ['css/style.css']
				}
			}
		},
		cssmin: {
			style: {
				options: {
					KeepSpecialComments: 0,
					report: 'gzip'
				},
				files: {
					'build/css/style.min.css' : ['build/css/style.css']
				}
			}
		},
		csscomb: {
			style: {
				files: {
					'css/style.css' : ['css/style.css']
				}
			}
		},
		imagemin: {
			build: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ['img/**/*.{png, jpg, gif, svg}']
				}]
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				caseSensitive: true,
				keepClosingSlash: true
			},
			build: {
				files: {
					'build/index.html' : 'build/index.html'
				}
			}
		},
		clean: {
			build: ['build']
		},
		copy: {
			build: {
				files: [{
					expand: true,
					src: [
						'css/**',
						'img/**',
						'js/**',
						'*.html'
					],
					dest: 'build'
				}]
			}
		},
		watch: {
			styles: {
				files: ['less/**/*.less'],
				tasks: ['less', 'autoprefixer'],
				options: {
					spawn: false
				}
			}
		},
		uglify: {
			build: {
				src: 'build/js/js.js',
				dest: 'build/js/js.min.js'
			}
		}
	});
	
	grunt.registerTask('default', [
		'imagemin',
		'clean',
		'copy',
		'cssmin',
		'htmlmin',
		'uglify'
	]);
	
	grunt.registerTask('debug', [
		'less',
		'autoprefixer',
		'cmq',
		'csscomb'
	]);
};