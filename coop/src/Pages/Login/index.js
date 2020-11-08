import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { CgDanger } from "react-icons/cg";

import { Container } from './styles';
import Button from '../../Components/Button';

import logo from '../../assets/coop-logo.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Login = () => {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  /*TODO: se ja tiver logado, n pede mais o login */
  function onSubmit(data) {
    if (data.email === 'ong@gmail.com' && data.senha === 'ong1234')
      history.push('/dashboard');
  }

  return (
    <Container>

      <aside>
        <p>
          Colabore com o <br/>trabalho de ONGs
        </p>
      </aside>

      <section>

        <img src={logo} alt="" />
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            Login
          </p>
          
          <div>
            <label htmlFor="email">          
              E-mail
            </label>

            <input
              type="text"
              name="email"
              id="email" 
              ref={register({
                required: "Por favor, preencha o campo.",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Informe um e-mail válido.",
                },
              })}
            />

            {errors.email && <p className="error"><CgDanger color="red" size={16} /> {errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="senha" className="label-senha">
              Senha
              {/* <span><a href="#">
                Esqueceu a senha?
              </a></span> */}
            </label>
              
            <div>
              <input
                type={passwordShown ? "text" : "password"}
                name="senha"
                id="senha"
                ref={register({
                  required: "Por favor, preencha o campo.",
                  pattern: {
                    value: /^.{6,}$/,
                      message: "A senha deve possuir mais que 6 caracteres.",
                    },
                  })}
              />
              <i onClick={togglePasswordVisiblity}>{passwordShown ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}</i>
            </div>

            {errors.senha && <p className="error"><CgDanger color="red" size={16} /> {errors.senha.message}</p>}
          </div>

          <Button background="var(--verde)" backgroundHover="var(--roxo)" type="submit">
            Acessar
          </Button>
        </form>

        <p>
          Não possui cadastro?
          <span onClick={() => history.push('/cadastrar-ong')}>
            Crie sua conta agora
          </span>
        </p>
      </section>
    </Container>
  );
};

export default Login;
