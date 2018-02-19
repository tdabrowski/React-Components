module.exports	=	{
	entry:	"./src/components/slider/slider.jsx",
	output:	{filename:"./js/main.js"	},
	devtool: 'eval-source-map',
	watch:	true,
	module:	{
		loaders: [ {
		  test:	/\.jsx$/, exclude: /node_modules/,
		  loader:'babel-loader',
		  query:{presets:['es2015','stage-2','react']}
			}
		]
	}
}
