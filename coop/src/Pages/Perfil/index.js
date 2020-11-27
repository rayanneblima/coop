import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { useParams, useHistory } from "react-router-dom";

import api from '../../services/api';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { Container, CardOng, ListLastActions } from "./styles";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Contato } from "../../Components/BoxOngResumo/styles";
import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { MdMail } from "react-icons/md";

import BoxOngLastAction from "../../Components/BoxOngLastAction";
import Button from "../../Components/Button";
import ItensNecessarios from "../../Components/ItensNecessarios";

import logoOng1 from "../../assets/img_ong_acoes/logo-1.png";
import bannerOng1 from "../../assets/img_ong_banner/banner-ong1.png";
import bannerOng2 from "../../assets/img_ong_banner/banner-ong2.png";
import bannerOng3 from "../../assets/img_ong_banner/banner-ong3.png";


const Perfil = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ong, setOng] = useState({});
  const [itensRequeridos, setItensRequerido] = useState({});
  const [publicacoes, setPublicacoes] = useState([]);
  const [paginacaoPublicacoes, setPaginacaoPublicoes] = useState(0);
  const [carregandoPublicacoes, setCarregandoPublicacoes] = useState(false);

  useEffect(() => {
    api.get(`/ongs/ong/${id}`).then((response) => {
      setOng(response.data);
      setItensRequerido(response.data.itens_doacao_requeridos.replace(' ', '').split(','));
    });

    /**
     * Carrega publicações
     */
    setCarregandoPublicacoes(true);

    api.get(`/publicacao/${id}?pagina=0&quantidade=2`).then((response) => {
      console.log(response.data.publicacoes);
      setPublicacoes(response.data.publicacoes.map(pub => {
        return {...pub, data_publicacao: format(parseISO(pub.data_publicacao), 'dd/MM/yyyy')}
      }));

      setPaginacaoPublicoes({
        paginaAtual: response.data.paginaAtual,
        totalPaginas: response.data.totalPaginas
      });

      setCarregandoPublicacoes(false);
    });
  }, [id]);

  function handleVerMaisPublicacoes() {
    setCarregandoPublicacoes(true);

    api.get(`/publicacao/${id}?pagina=${paginacaoPublicacoes.paginaAtual + 1}&quantidade=2`).then(response => {
      setPublicacoes([...publicacoes, ...response.data.publicacoes]);
  
      setPaginacaoPublicoes({
        paginaAtual: response.data.paginaAtual,
        totalPaginas: response.data.totalPaginas
      });

      setCarregandoPublicacoes(false);
    });
  }

  return (
    <>
      <Header />

      <Container>
        <div className="banner-ong">

          <Carousel
            showArrows={true}
            showThumbs={false}
            dynamicHeight={false}
            style={{ borderRadius: "20px;" }}
          >
            <div>
              <img src={bannerOng1} className="banner" alt="Imagem ONG" />
            </div>
            <div>
              <img src={bannerOng2} className="banner" alt="Imagem ONG" />
            </div>
            <div>
              <img src={bannerOng3} className="banner" alt="Imagem ONG" />
            </div>
            
          </Carousel>

          <img src={logoOng1} alt="" className="logo-ong" />
        </div>

        <section>
          <CardOng>
            <h2>{ong.nome_ong}</h2>
            <h4>{ong.logradouro_local_ong}, {ong.numero_local_ong} {ong.complemento_local_ong && `, ${ong.complemento_local_ong}`} - {ong.cidade} / {ong.estado}</h4>

            <Contato>
              <a href={`mailto:${ong.email}`}><MdMail /></a>
              {
                ong.whatsapp_ong && (
                  <a href={`https://api.whatsapp.com/send?phone=55${ong.whatsapp_ong}&text=&source=&data=&app_absent=`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                )
              }
              {
                ong.facebook_ong && (
                  <a href={ong.facebook_ong} target="_blank" rel="noopener noreferrer"><AiFillFacebook /></a>
                )
              }
              {
                ong.instagram_ong && (
                  <a href={ong.instagram_ong} target="_blank" rel="noopener noreferrer"><AiOutlineInstagram /></a>
                )
              }
            </Contato>

            <p className="informacoes-ong">{ong.sobre_ong}</p>

            {itensRequeridos.length > 0 && <ItensNecessarios itens={itensRequeridos} />}

            <Button background="var(--verde)" backgroundHover="var(--roxo)" onClick={() => history.push(`/doacao/${ong.id}`)}>
              Colaborar
            </Button>
          </CardOng>

          <ListLastActions>
            <h2>Ações Realizadas</h2>

            {publicacoes.map(publicacao => (
              <BoxOngLastAction
                key={publicacao.id}
                publicacao={publicacao}
                ong={publicacao.fkOng}
              />
            ))}

            {(paginacaoPublicacoes.paginaAtual < paginacaoPublicacoes.totalPaginas - 1) && 
              <Button background="var(--verde)" backgroundHover="var(--roxo)" onClick={handleVerMaisPublicacoes} id="btnVerMaisPub">
                {carregandoPublicacoes ? 'Carregando...' : 'Ver mais publicações'}
              </Button>
            }
          </ListLastActions>
        </section>
      </Container>

      <Footer />
    </>
  );
};

export default Perfil;
