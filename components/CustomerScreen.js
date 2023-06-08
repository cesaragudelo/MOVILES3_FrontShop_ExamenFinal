import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useForm, Controller, set } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";

export default function App() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [idSearch, setIdSearch] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      foto: "",
      descripcion: "",
      precio:"",
      numPersonas:""
    },
  });

  const onSave = async (data) => {
    console.log(data)
    let nombre = data.nombre;
   // console.log(data.nombre)
    //let foto = data.foto;
    let descripcion = data.descripcion
   // console.log(data.descripcion)
    let precio = data.precio
    //console.log(data.precio)
    let numPersonas = data.numPersonas
    //console.log(data.numPersonas)
    const response = await axios.post(`http://127.0.0.1:3000/registrarhabitacion`, {
      nombre,
      descripcion,
      precio,
      numPersonas

    });
    setIsError(false);
    setMessage("Habitacion creada correctamente");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    reset();
  };

  const onUpdate = async (data) => {
    //console.log(data)
    const response = await axios.put(
      `http://127.0.0.1:3000/editarhabitacion/${idSearch}`,
      {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        numPersonas: data.numPersonas
      }
    );
    setIsError(false);
    setMessage("habitacion actualizada correctamente...");
    setTimeout(() => {
      setMessage("");
      reset();
    }, 2000);
    setIdSearch("");
  };

  const onDelete = async (data) => {
    if (
      confirm(
        `Está seguro de eliminar la habitacion ${data.nombre} ${data.idSearch}`
      )
    ) {
      const response = await axios.delete(
        `http://127.0.0.1:3000/eliminarhabitacion/${idSearch}`
      );
      setIsError(false);
      setMessage("habitacion eliminada correctamente...");
      setTimeout(() => {
        setMessage("");
        reset();
      }, 2000);
      setIdSearch("");
    }
  };

  const onSearch = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3000/buscarhabitacion/${idSearch}`
    );
    console.log(response.data);
    if (!response.data.error) {
      // lo encuentra
      setValue("nombre", response.data.nombre);
      setValue("descripcion", response.data.descripcion);
      setValue("precio", response.data.precio);
      setValue("numpersonas", response.data.numPersonas);
      setIsError(false);
      setMessage("");
    } else {
      setIsError(true);
      setMessage("Id de habitacion NO existe");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Habitaciones</Text>
      <TextInput
        label="id de la habitacion"
        mode="outlined"
        onChangeText={(idSearch) => setIdSearch(idSearch)}
        value={idSearch}
      />
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 10, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="nombre"
      />
      {errors.nombre?.type == "required" && (
        <Text style={{ color: "red" }}>El nombre es obligatorio</Text>
      )}
      {errors.nombre?.type == "maxLength" && (
        <Text style={{ color: "red" }}>
          El nombre no debe exceder de 30 chars
        </Text>
      )}
    

    <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Foto "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 10, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="foto"
      />
      {errors.nombre?.type == "required" && (
        <Text style={{ color: "red" }}>El nombre es obligatorio</Text>
      )}
      {errors.nombre?.type == "maxLength" && (
        <Text style={{ color: "red" }}>
          El nombre no debe exceder de 30 chars
        </Text>
      )}
      

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Descripcion"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 10, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="descripcion"
      />
      {errors.lastName && (
        <Text style={{ color: "red" }}>El Apellido es obligatorio</Text>
      )}
      <Text style={{ color: isError ? "red" : "green" }}>{message}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Precio "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 10, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="precio"
      />
      {errors.nombre?.type == "required" && (
        <Text style={{ color: "red" }}>El nombre es obligatorio</Text>
      )}
      {errors.nombre?.type == "maxLength" && (
        <Text style={{ color: "red" }}>
          El nombre no debe exceder de 30 chars
        </Text>
      )}
       <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Numero Personas "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 10, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="numPersonas"
      />
      {errors.nombre?.type == "required" && (
        <Text style={{ color: "red" }}>El nombre es obligatorio</Text>
      )}
      {errors.nombre?.type == "maxLength" && (
        <Text style={{ color: "red" }}>
          El nombre no debe exceder de 30 chars
        </Text>
      )}

      <View style={{ flexDirection: "row" }}>

      
      

        <Button
          icon="plus-box"
          mode="contained"
          onPress={onSave}
          style={{ backgroundColor: "green" }}
        >
          Guardar
        </Button>
        <Button
          icon="card-search-outline"
          mode="contained"
          onPress={onSearch}
          style={{ backgroundColor: "blue" }}
        >
          Buscar
        </Button>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Button
          icon="pencil-outline"
          mode="contained"
          onPress={handleSubmit(onUpdate)}
          style={{ backgroundColor: "orange" }}
        >
          Actualizar
        </Button>
        <Button
          icon="delete-outline"
          mode="contained"
          onPress={handleSubmit(onDelete)}
          style={{ backgroundColor: "red" }}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

