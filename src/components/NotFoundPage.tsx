import React from 'react';
import '../styles/NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-page">
            <h1>404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
        </div>
    );
};

export default NotFoundPage;