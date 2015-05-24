module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		//компиляция less
		less: {
			style: {
				files: {
					'css/style.css' : ['less/common.less']
				}
			}
		},
		//автопрефиксер
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8']
			},
			style: {
				src: 'css/style.css'
			}
		},
		//комбинирует медиа-выражения
		cmq: {
			style: {
				files: {
					'css/style.css' : ['css/style.css']
				}
			}
		},
		//минимизирует стилевой файл
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
		//делает стилевой файл красивым
		csscomb: {
			style: {
				files: {
					'css/style.css' : ['css/style.css']
				}
			}
		},
		//минимизирует изображения
		imagemin: {
			build: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ['images/**/*.{png, jpg, gif, svg}']
				}]
			}
		},
		//минимизирует html-файлы
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
		//очистка папки проекта
		clean: {
			build: ['build']
		},
		//копирование файлов в папку проекта
		copy: {
			build: {
				files: [{
					expand: true,
					src: [
						'css/**',
						'images/**',
						'scripts/**'
					],
					dest: 'build'
				}]
			},
			//копирование только нужных html-файлов
			build_html: {
				files: [{
					expand: true,
					cwd: 'html/',
					src:['*.html'],
					dest: 'build'
				}]
			}
		},
		//работа с jade-файлами
		jade: {
			//основные файлы
			temp: {
				options: {
					pretty: true
				},
					files: [{
						expand: true,
						cwd: 'app/jade/pages/',
						src: ['*.jade'],
						dest: 'app/html/',
						ext: '.html',
						extDot: 'last'
					}]
				},
			//куски кода
			parts: {
				options: {
					pretty: true
				},
				files: [{
					expand: true,
					cwd: ['app/jade/blocks/', 'app/jade/layouts/'],
					src: ['*.jade'],
					dest: 'app/html/parts',
					ext: '.html',
					extDot: 'last'
				}]
			}
		},
		//замена пробелов табами в html-файлах
		prettify: {
			options: {
				indent: 1,
				indent_char: '	'
			},
			html: {
				expand: true,
				cwd: 'app/html',
				ext: '.html',
				src: '**/*.html',
				dest: 'app/html'
			}
		},
		//запуск автоматических функций
		watch: {
			//компилятор less и автопрефиксер
			styles: {
				files: ['less/**/*.less'],
				tasks: ['less', 'autoprefixer'],
				options: {
					spawn: false
				}
			},
			//компилятор jade
			jades: {
				files: ['app/jade/**/*.jade'],
				tasks: ['jade'],
				options: {
					spawn: false
				}
			}
		},
		//минимизатор JS
		uglify: {
			build: {
				src: 'build/js/js.js',
				dest: 'build/js/js.min.js'
			}
		},
		//замена относительных адресов
		replace: {
			build: {
				options: {
					patterns: [{
						match: /src="..\//g,
						replacement: 'src="'
					}, {
						match: /href="..\//g,
						replacement: 'href="'
					}]
				},
				files: [{
					expand: true,
					flattern: true,
					src: ['build/*.html']
				}]
			}
		}
	});
	
	grunt.registerTask('default', [
//		'imagemin',
		'clean',
		'copy',
//		'cssmin',
//		'htmlmin',
//		'uglify',
		'replace'
	]);
	
	grunt.registerTask('debug', [
		'less',
		'autoprefixer',
		'cmq',
		'csscomb'
	]);
};