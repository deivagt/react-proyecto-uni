import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import './Inventario.css';
import MultiSelect from '@khanacademy/react-multi-select';

class InventoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bienes: [],
            nuevoBienModal: false, //establece que el modal no se abre
            editarBienModal: false,
            nuevoBienData: {
                codigo: 0,
                nombre: '',
                descripcion: '',
                cantidad: 0,
                encargados: [
                    {
                        nickname_encargado: '',
                        nombre_encargado: ''
                    }
                ],
                ubicacion: '',
                estado: 'En uso'
            },
            editarBienData: {
                codigo: 0,
                nombre: '',
                descripcion: '',
                cantidad: 0,
                encargados: [
                    {
                        nickname_encargado: '',
                        nombre_encargado: ''
                    }
                ],
                ubicacion: '',
                estado: 'En uso'
            }
        }
    }

    componentDidMount() {
        this._refrescarBienes();
    }

    toggleNuevoBien() { //función para abrir y cerrar el modal para agregar
        this.setState({
            nuevoBienModal: !this.state.nuevoBienModal
        })
    }

    toggleEditarBien() { //función para abrir y cerrar el modal de edición
        this.setState({
            editarBienModal: !this.state.editarBienModal
        })
    }

    agregarBien(event) { //funcion que agrega un nuevo bien al inventario
        event.preventDefault();

        let nuevoBienData = this.state.nuevoBienData;
        console.log('Datos de nuevo bien', nuevoBienData);

        axios
            .post('/api/inventario/nuevo', nuevoBienData) //envía los datos del nuevo bien al servidor
            .then(res => {
                console.log(res.data)
                let { bienes } = this.state; //asigna la respuesta del servidor al estado bienes

                bienes.push(res.data); //ingresa el bien al listado de bienes de FrontEnd
                this.setState({
                    bienes, nuevoBienModal: false, nuevoBienData: { //actualizando el estado
                        codigo: res.data.codigo,
                        nombre: '',
                        descripcion: '',
                        cantidad: 0,
                        encargados: [
                            {
                                nickname_encargado: '',
                                nombre_encargado: ''
                            }
                        ],
                        ubicacion: '',
                        estado: ''
                    }
                });
                console.log(this.state.bienes)
            })
    }

    actualizarBien() {
        axios
            .put('/api/inventario/editar', this.state.editarBienData)
            .then(res => {
                this._refrescarBienes();
                this.setState({
                    editarBienModal: false,
                    editarBienData: {
                        codigo: 0,
                        nombre: '',
                        descripcion: '',
                        cantidad: 0,
                        encargados: [
                            {
                                nickname_encargado: '',
                                nombre_encargado: ''
                            }
                        ],
                        ubicacion: '',
                        estado: 'En uso'
                    }
                })
                console.log(this.state.bienes);
            });
    }

    editarBien(codigo, nombre, descripcion, cantidad, ubicacion, estado) {
        this.setState({ //actualizado el estado de la variable de edicion de libro
            editarBienData: { codigo, nombre, descripcion, cantidad, ubicacion, estado }, editarBienModal: !this.setState.editarBienModal
        })
    }

    _refrescarBienes(){
        axios
            .get('/api/inventoryList') //solicitando los bienes al servidor
            .then(res => {
                this.setState({
                    bienes: res.data //obteniendo la información enviada por el servidor
                })
                /* console.log(this.state.bienes); */
            });
    }

    eliminarBien(codigo){
        console.log('Código de producto', codigo)
        axios
            .delete('/api/inventario/eliminar', {
                params: {
                    codigo: codigo
                }
            })
            .then(res => {
                
            })
    }

    render() {
        let bienes = this.state.bienes.map(bien => { //recorriendo arreglo de bienes
            return (
                <tr key='llave-1'>
                    <td>{bien.codigo}</td>
                    <td>{bien.nombre}</td>
                    <td>{bien.descripcion}</td>
                    <td>
                        <Button color="success" className="mr-2" onClick={this.editarBien.bind(this, bien.codigo, bien.nombre, bien.descripcion, bien.cantidad, bien.ubicacion, bien.estado)}>Modificar</Button>
                        <Button color="danger" onClick={this.eliminarBien.bind(this, bien.codigo)}>Eliminar</Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <div className="container">
                    <h3>Todos los bienes</h3>
                    <div className="container">
                        <Button color="primary" onClick={this.toggleNuevoBien.bind(this)}>Agregar Bien</Button>
                        <Modal isOpen={this.state.nuevoBienModal} toggle={this.toggleNuevoBien.bind(this)}>
                            <ModalHeader toggle={this.toggleNuevoBien.bind(this)}>Agregar un nuevo bien...</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="nombre">Nombre</Label>
                                    <Input id="nombre" name="nombre" value={this.state.nuevoBienData.nombre} onChange={(e) => {
                                        let { nuevoBienData } = this.state;
                                        nuevoBienData.nombre = e.target.value;

                                        this.setState({ nuevoBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="descripcion">Descripción</Label>
                                    <Input type="textarea" id="descripcion" name="descripcion" value={this.state.nuevoBienData.descripcion} onChange={(e) => {
                                        let { nuevoBienData } = this.state;
                                        nuevoBienData.descripcion = e.target.value;

                                        this.setState({ nuevoBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cantidad">Cantidad</Label>
                                    <Input id="cantidad" name="cantidad" value={this.state.nuevoBienData.cantidad} onChange={(e) => {
                                        let { nuevoBienData } = this.state;
                                        nuevoBienData.cantidad = e.target.value;

                                        this.setState({ nuevoBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="selectEncargado">Seleccionar encargado</Label>
                                    <Input type="select" id="selectEncargado">
                                        <option>1</option>
                                        <option>2</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ubicacion">Ubicación</Label>
                                    <Input id="ubicacion" name="ubicacion" value={this.state.nuevoBienData.ubicacion} onChange={(e) => {
                                        let { nuevoBienData } = this.state;
                                        nuevoBienData.ubicacion = e.target.value;

                                        this.setState({ nuevoBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="estado">Estado</Label>
                                    <Input type="select" id="estado" value={this.state.nuevoBienData.estado} onChange={(e) => {
                                        let { nuevoBienData } = this.state;
                                        nuevoBienData.estado = e.target.value;

                                        this.setState({ nuevoBienData });
                                    }}>
                                        <option>En uso</option>
                                        <option>Sin uso</option>
                                    </Input>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.agregarBien.bind(this)}>Agregar</Button>{' '}
                                <Button color="secondary" onClick={this.toggleNuevoBien.bind(this)}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.editarBienModal} toggle={this.toggleEditarBien.bind(this)}>
                            <ModalHeader toggle={this.toggleEditarBien.bind(this)}>Edición de bien</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="nombre">Nombre</Label>
                                    <Input id="nombre" name="nombre" value={this.state.editarBienData.nombre} onChange={(e) => {
                                        let { editarBienData } = this.state;
                                        editarBienData.nombre = e.target.value;

                                        this.setState({ editarBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="descripcion">Descripción</Label>
                                    <Input type="textarea" id="descripcion" name="descripcion" value={this.state.editarBienData.descripcion} onChange={(e) => {
                                        let { editarBienData } = this.state;
                                        editarBienData.descripcion = e.target.value;

                                        this.setState({ editarBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cantidad">Cantidad</Label>
                                    <Input id="cantidad" name="cantidad" value={this.state.editarBienData.cantidad} onChange={(e) => {
                                        let { editarBienData } = this.state;
                                        editarBienData.cantidad = e.target.value;

                                        this.setState({ editarBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="selectEncargado">Seleccionar encargado</Label>
                                    <Input type="select" id="selectEncargado">
                                        <option>1</option>
                                        <option>2</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ubicacion">Ubicación</Label>
                                    <Input id="ubicacion" name="ubicacion" value={this.state.editarBienData.ubicacion} onChange={(e) => {
                                        let { editarBienData } = this.state;
                                        editarBienData.ubicacion = e.target.value;

                                        this.setState({ editarBienData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="estado">Estado</Label>
                                    <Input type="select" id="estado" value={this.state.editarBienData.estado} onChange={(e) => {
                                        let { editarBienData } = this.state;
                                        editarBienData.estado = e.target.value;

                                        this.setState({ editarBienData });
                                    }}>
                                        <option>En uso</option>
                                        <option>Sin uso</option>
                                    </Input>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.actualizarBien.bind(this)}>Actualizar</Button>{' '}
                                <Button color="secondary" onClick={this.toggleEditarBien.bind(this)}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bienes}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default InventoryList;