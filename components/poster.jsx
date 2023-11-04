import { posterStyles } from '../styles';
import { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';

const Poster = ({ movies }) => {
	const [index, setIndex] = useState(0);
	const [activeMovie, setActiveMovie] = useState();

	useEffect(() => {
		if (!movies || movies.length === 0) return;

		setActiveMovie(movies[index]);

		const interval = setInterval(() => {
			setIndex(prevIndex => {
				const nextIndex = (prevIndex + 1) % movies.length;
				setActiveMovie(movies[nextIndex]);
				return nextIndex;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [movies]);

	// Retornamos la estructura del componente
	return activeMovie ? (
		<>
			<View style={posterStyles.container}>
				<View>
					<Image
						source={{ uri: activeMovie.Poster }}
						style={{ width: 200, height: 300 }}
					/>
				</View>
			</View>
			<Text style={posterStyles.text}>
				{capitalize(activeMovie.Type)}: {activeMovie.Title}
			</Text>
			<Text style={posterStyles.text}>{activeMovie.Year}</Text>
		</>
	) : (
		<Text style={posterStyles.text}>
			{activeMovie ? activeMovie : 'Sin datos de película'}
		</Text>
	);
};

export default Poster;

const capitalize = str => str[0].toUpperCase() + str.slice(1);
