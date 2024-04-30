
export interface Viaje {
    id:       number;
    comienzo: string;
    destino:  string;
    tarifa:   number;
    usuario:  string;
    correo:   string;
    startgeo: {
        lat: number,
        lng: number
    };
    endgeo:   {
        lat: number,
        lng: number
    };
}
