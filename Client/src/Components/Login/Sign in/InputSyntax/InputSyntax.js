import '../../Log in/LoginBtn.css';

const nameValidation = ['Minimo 3 caracteres', 'Maximo 18 caracteres', 'Debe comenzar con mayuscula', 'Admite alfabeto castellano'];
const passwordValidation = ['Minimo 6 caracteres', 'Maximo 15 caracteres']

const ArrayMaper = (array) => {
	return array.map((val) => {
		return (
			<p key={array.indexOf(val)}>- {val}</p>
		);
	});
};

export default function InputSyntax({inputName, style}) {
	return (
		<div className='input-syntax' style={style}>
			{inputName === 'password' ? (ArrayMaper(passwordValidation)) : (ArrayMaper(nameValidation))}
		</div>
	);
}