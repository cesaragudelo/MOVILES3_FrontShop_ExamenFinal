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
      apellido: "",
      telefono: "",
      fechaInicio:"",
      fechaFin:"",
      numNiños:"",
      numAdultos:"",
      costoReserva:""
     
    },
  });

  const onSave = async (data) => {
    //console.log(data)
    let nombre = data.nombre;
    let apellido = data.apellido;
    let telefono = data.telefono;
    let fechaInicio= data.fechaInicio;
    let fechaFin = data.fechaFin;
    let numNiños = data.numNiños;
    let numAdultos = data.numAdultos;
    let costoReserva = data.costoReserva
    const response = await axios.post(`http://127.0.0.1:3000/registrarreserva`, {
      nombre,
      apellido,
      telefono,
      fechaInicio,
      fechaFin,
      numNiños,
      numAdultos,
      costoReserva
    });
    setIsError(false);
    setMessage("reserva creada correctamente");
    setTimeout(() => {
      setMessage("");
    }, 2000);
    reset();
  };

  const onUpdate = async (data) => {
    //console.log(data)
    const response = await axios.put(
      `http://127.0.0.1:3000/editarreserva/${idSearch}`,
      {
        nombre: data.nombre,
        apellidos: data.apellido,
        telefono: data.telefono,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        numNiños: data.numNiños,
        numAdultos: data.numAdultos,
        costoReserva: data.costoReserva
      }
    );
    setIsError(false);
    setMessage("reserva actualizada correctamente...");
    setTimeout(() => {
      setMessage("");
      reset();
    }, 2000);
    setIdSearch("");
  };

  const onDelete = async (data) => {
    if (
      confirm(
        `Está seguro de eliminar la reserva ${data.nombre} ${data.apellido}`
      )
    ) {
      const response = await axios.delete(
        `http://127.0.0.1:3000/eliminarreserva/${idSearch}`
      );
      setIsError(false);
      setMessage("reserva eliminada correctamente...");
      setTimeout(() => {
        setMessage("");
        reset();
      }, 2000);
      setIdSearch("");
    }
  };

  const onSearch = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3000/buscarreserva/${idSearch}`
    );
    console.log(response.data);
    if (!response.data.error) {
      // lo encuentra
      setValue("nombre", response.data.nombre);
      setValue("apellido", response.data.apellidos);
      setValue("telefono", response.data.telefono);
      setValue("fechaInicio", response.data.fechaInicio);
      setValue("fechaFin", response.data.fechaFin);
      setValue("numNiños", response.data.numNiños);
      setValue("numAdultos", response.data.numAdultos);
      setValue("costoReserva", response.data.costoReserva);
      setIsError(false);
      setMessage("");
    } else {
      setIsError(true);
      setMessage("Id de reserva NO existe");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32,marginBottom:1 }}>Reservas</Text>
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
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
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
            label="Apellido "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="apellido"
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
            label="Telefono "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="telefono"
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
            label="fecha inicio "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fechaInicio"
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
            label="Fecha fin "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fechaFin"
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
            label="numero niños"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="numNiños"
      />
      {errors.apellido && (
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
            label="Numero Adultos "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="numAdultos"
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
            label="Costo reserva "
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            style={{ marginBottom: 1, backgroundColor: "powderblue" }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="costoReserva"
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
          onPress={handleSubmit(onSave)}
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
      <View style={{ flexDirection: "row", marginTop: 10 }}>
       
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

