<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
    rel="stylesheet"
  />

  <div
    class="container module_adsgen"
    v-loading.fullscreen.lock="loading"
    element-loading-text="Cargando"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- <canvas class="" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas> -->
    <transition name="fade" mode="out-in">
      <div :key="step">
        <div class="container_ads" v-if="step === 1">
          <!-- Paso 1 -->
          <h2>!Comencemos!</h2>
          <div class="space"></div>
          <!-- <h3>Selecciona la marca que deseas promocionar</h3> -->
          <div class="space"></div>
          <h3>Marcas</h3>
          <div class="input-ads">
            <span class="label"
              >Selecciona una marca para crear la promoción</span
            >
            <div class="slide_select">
              <label
                v-for="option in brandsOptions"
                :key="option.id"
                class="radio-container"
              >
                <input
                  v-if="option.enable"
                  name="brand"
                  type="radio"
                  :value="option.id"
                  v-model="brandSelected"
                  class="radio-input"
                />
                <img
                  v-if="option.enable"
                  :src="option.imageUrl"
                  alt="Option"
                  class="radio-image pointer"
                />
                <img
                  v-else
                  :src="option.imageUrl"
                  alt="Option"
                  class="radio-image disable"
                />
              </label>
            </div>
          </div>
          <!-- <div class="input-ads">
            <span class="label">Selecciona la promoción</span>
            <el-select
              v-model="promoSelected"
              size="large"
              value-key="id"
              placeholder="Selecciona"
              style="width: 50%"
            >
              <el-option
                v-for="item in promoOptions"
                :key="item.id"
                :label="item.displayText"
                :value="item"
                :disabled="item.disabled"
              />
            </el-select>
          </div>   -->
          <div class="bottom">
            <el-button class="btn btn-primary" v-if="isValid1" @click="nextStep"
              >Continuar</el-button
            >
            <el-button
              class="btn btn-primary btn-disabled"
              v-else
              @click="validateForm"
              >Continuar</el-button
            >
          </div>
        </div>
        <div class="container_ads" v-else-if="step === 2">
          <!-- Paso 2 -->
          <div class="header_step_2">
            <button class="btn btn-primary" @click="prevStep">Atrás</button>
            <img :src="brandSelectedImg" alt="Option" class="radio-image" />
            <div class="block-30"></div>
          </div>
          <div class="space_min"></div>
          <h2>¡Muy bien!</h2>
          <div class="space_min"></div>
          <h3>Ahora, selecciona y completa los siguientes datos solicitados</h3>
          <div class="space_min"></div>
          <div class="input-ads">
            <span class="label">Nombre del punto de venta</span>
            <el-input
              size="large"
              v-model="textCommerce"
              type="text"
              placeholder="Ingrese nombre"
              maxlength="33"
              show-word-limit
              clearable
            />
          </div>
          <div class="input-ads">
            <span class="label">Palabra de invitación</span>
            <small
              >La palabra de invitación no debe ser mayor a 20 caracteres,
              ejemplo [Llevate, Compra, oferta]</small
            >
            <el-input
              size="large"
              v-model="textTitle"
              type="text"
              placeholder="Ingrese palabra de inivtación"
              maxlength="20"
              show-word-limit
              clearable
            />
          </div>
          <div class="input-ads-group">
            <div class="input-ads">
              <span class="label">Presentación producto</span>
              <el-select
                v-model="typeProductSelected"
                size="large"
                value-key="id"
                placeholder="Selecciona"
                style="width: 100%"
                @change="changeTypeProduct()"
              >
                <el-option
                  v-for="item in typeProduct"
                  :key="item.id"
                  :label="item.label"
                  :value="item"
                  :disabled="item.disabled"
                />
              </el-select>
            </div>
            <div class="divider"></div>
            <div class="input-ads">
              <span class="label">Cantidad de unidades</span>
              <el-input-number
                size="large"
                v-model="textPromo"
                :min="1"
                :max="99"
                style="width: 100%"
              />
            </div>
          </div>
          <div class="input-ads switch-value">
            <el-switch
              v-model="unitValue"
              class="mb-2"
              active-text="Valor unitario"
              inactive-text="Valor promocional"
            />
          </div>
          <div v-if="unitValue" class="input-ads">
            <span class="label">¿Cuál es el precio?</span>
            <el-input
              v-model="textPrice"
              size="large"
              placeholder="Ingresar precio"
              :formatter="
                (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              maxlength="8"
              clearable
            />
          </div>
          <div v-else class="input-ads-group">
            <div class="input-ads">
              <span class="label">Precio normal</span>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Este será el precio antes."
                placement="top-start"
              >
                <el-input
                  v-model="textPriceNormal"
                  size="large"
                  placeholder="Ingresar precio anterior"
                  :formatter="
                    (value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                  maxlength="8"
                  clearable
                />
              </el-tooltip>
            </div>
            <div class="divider"></div>
            <div class="input-ads">
              <span class="label">Precio promoción</span>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Este será el precio actual o promocional."
                placement="top-start"
              >
                <el-input
                  v-model="textPricePromo"
                  size="large"
                  placeholder="Ingresar precio anterior"
                  :formatter="
                    (value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                  maxlength="8"
                  clearable
                />
              </el-tooltip>
            </div>
          </div>
          <div class="input-ads-group">
            <div class="input-ads">
              <span class="label">Fecha inicio</span>
              <el-date-picker
                v-model="dateStart"
                type="date"
                placeholder="Seleccione un día"
                format="DD/MM/YYYY"
                value-format="DD/MM/YYYY"
                size="large"
                style="
                  width: 100%;
                  border: 1px solid #a1a1a1;
                  border-radius: 5px;
                "
              />
            </div>
            <div class="divider"></div>
            <div class="input-ads">
              <span class="label">Fecha fin</span>
              <el-date-picker
                class="select_date"
                v-model="dateEnd"
                type="date"
                placeholder="Seleccione un día"
                format="DD/MM/YYYY"
                value-format="DD/MM/YYYY"
                size="large"
                style="
                  width: 100%;
                  border: 1px solid #a1a1a1;
                  border-radius: 5px;
                "
              />
            </div>
          </div>
          <div class="input-ads">
            <span class="label"
              >Seleccione el fondo para el post que más te guste</span
            >
            <div class="slide_select">
              <label
                v-for="option in backgroundOptions"
                :key="option.id"
                class="radio-container"
              >
                <input
                  name="brand"
                  type="radio"
                  :value="option.id"
                  v-model="backgroundSelected"
                  class="radio-input"
                />
                <img
                  :src="option.imageUrl"
                  alt="Option"
                  class="radio-image m-1"
                />
              </label>
            </div>
          </div>
          <div class="bottom">
            <el-button class="btn btn-primary" v-if="isValid2" @click="nextStep"
              >Siguiente</el-button
            >
            <el-button
              class="btn btn-primary btn-disabled"
              v-else
              @click="validateForm"
              >Siguiente</el-button
            >
          </div>
        </div>
        <div class="container_ads" v-else>
          <!-- Paso 3 -->
          <div class="header_step_2">
            <button class="btn btn-primary" @click="prevStep">Atrás</button>
            <img :src="brandSelectedImg" alt="Option" class="radio-image" />
            <div class="block-30"></div>
          </div>
          <div class="space_min"></div>
          <h2 class="text-align-center">¡Listo!, Así se vería tu anuncio</h2>
          <div class="space_min"></div>
          <div class="content_image text-align-center">
            <img :src="imageFinal" alt="Promotion generated from Module" />
          </div>
          <div class="bottom">
            <button class="btn btn-primary" @click="downloadImage">
              Descargar
            </button>
            <button
              v-if="isMobile"
              class="btn btn-primary btn-shared"
              @click="shareImage"
            >
              Compartir</button
            ><br />
          </div>
        </div>
      </div>
    </transition>
    <br />
    <br />
    <div class="content_image">
      <canvas
        class=""
        style="display: none"
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://centralganadores.test/themes/huellitas/assets/css/theme.css");
@import url("https://centralganadores.test/modules/clop//views/css/front.css");
@import url("https://centralganadores.test/themes/huellitas/assets/css/custom.css");
@import url("https://centralganadores.test/themes/huellitas/assets/css/styles-bimbo-v1.css");
// @import url('https://centraldeganadores.com/themes/huellitas/assets/css/theme.css');
// @import url('https://centraldeganadores.com/modules/clop//views/css/front.css');
// @import url('https://centraldeganadores.com/themes/huellitas/assets/css/custom.css');
// @import url('https://centraldeganadores.com/themes/huellitas/assets/css/styles-bimbo-v1.css');

.module_adsgen {
  span,
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #020e45;
  }
  .btn {
    margin: 5px;
  }
  .btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn-shared {
    background-color: #137e2c;
  }
  .btn-shared:hover {
    background-color: #fcdc3a;
  }
  .btn-primary:disabled {
    background-color: #184783;
  }
  .container_ads {
    padding: 5px 10%;
    max-width: 800px;
    margin: 0 auto;
  }
  .space_min {
    margin-top: 20px;
  }
  .space {
    margin-top: 40px;
  }
  .content_image {
    width: 100%;
    img {
      width: 290px;
    }
  }
  .block-30 {
    height: 30px;
    width: 30px;
  }
  .header_step_2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .input-ads {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    width: 100%;
    .label {
      font-size: medium;
      margin-bottom: 5px;
    }
    input,
    select {
      padding: 10px;
      border: 1px solid #a1a1a1;
      border-radius: 5px;
    }
    .el-input {
      border: 1px solid #a1a1a1;
      border-radius: 5px;
    }
  }
  .el-input__wrapper {
    padding: 5px 11px;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .input-ads-group {
    display: flex;
    flex-direction: row;
    .input-ads {
      width: 48%;
    }
    .divider {
      width: 4%;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .radio-container {
    display: inline-block;
    margin-right: 10px;
  }

  .radio-input {
    display: none;
  }

  .radio-image {
    width: 100px;
    border: 4px solid transparent;
  }

  .pointer {
    cursor: pointer;
  }

  img.disable {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  .radio-input:checked + .radio-image {
    border-color: #409eff;
    border-radius: 10px;
  }

  .bottom {
    text-align: center;
    margin-top: 15px;
  }

  .slide_select {
    display: flex;
    overflow-y: auto;
    // @media screen and (min-width: 768px) {
    //   justify-content: center;
    //   width: 100%;
    // }
  }

  .switch-value {
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";

export default {
  data() {
    return {
      url_ajax: "",
      // url_ajax: "https://centralganadores.test",

      loading: false,

      isValid1: false,
      isValid2: false,

      unitValue: true,

      canvasWidth: 1080,
      canvasHeight: 1920,
      textTitle: "",
      textPrice: "",
      textCommerce: "",
      textPromo: "",
      backgroundImage: "",
      step: 1,
      imageFinal: "",
      textPriceNormal: "",
      textPricePromo: "",

      dateStart: "",
      dateEnd: "",

      promoSelected: "",
      promoOptions: [
        { id: 1, label: "Promo 1", displayText: "Promoción Unitaria" },
        {
          id: 2,
          disabled: true,
          label: "Promo 2",
          displayText: "Promoción cubetazo",
        },
        {
          id: 3,
          disabled: true,
          label: "Promo 3",
          displayText: "Promoción combo",
        },
      ],

      brandSelected: "",
      brandSelectedImg: "",
      brandsOptions: [],

      typeProductSelected: "",
      typeProductSelectedLabel: "",
      typeProduct: [],

      // Section Settings - Background
      settingTitle: "",
      settingQty: "",
      settingDescription: "",
      settingPriceBeforeLabel: "",
      settingPriceBeforeValue: "",
      settingPriceAfterLabel: "",
      settingPriceAfterValue: "",
      settingPriceLabel: "",
      settingPriceValue: "",
      settingCommerce: "",
      settingValidity: "",
      // Section Settings - Background

      backgroundSelected: "",
      backgroundOptions: [],
    };
  },
  mounted() {
    this.renderImage();
    this.getBrands();
  },
  watch: {
    typeProductSelected(newValue) {
      this.typeProductSelectedLabel = newValue.displayText;
    },
    brandSelected(newValue) {
      const selected = this.brandsOptions.find(
        (option) => option.id === newValue
      );
      this.brandSelectedImg = selected.imageUrl;
      this.getDataBrand();
    },
    backgroundSelected(newValue) {
      const selected = this.backgroundOptions.find(
        (option) => option.id === newValue
      );
      this.backgroundImage = selected.imageUrl;

      let data_props = JSON.parse(
        this.backgroundOptions.find(
          (option) => option.id == this.backgroundSelected
        ).props
      );

      let isValidProps = this.validateDataProps(data_props);

      if (isValidProps) {
        this.settingTitle = data_props.title;
        this.settingQty = data_props.qty;
        this.settingDescription = data_props.description_prod;
        this.settingPriceBeforeLabel = data_props.price_before_label;
        this.settingPriceBeforeValue = data_props.price_before_value;
        this.settingPriceAfterLabel = data_props.price_after_label;
        this.settingPriceAfterValue = data_props.price_after_value;
        this.settingPriceLabel = data_props.price_label;
        this.settingPriceValue = data_props.price_value;
        this.settingCommerce = data_props.commerce;
        this.settingValidity = data_props.validity_dates;

        this.renderImage();
      } else {
        this.backgroundImage = "";
        this.changeTypeProduct();
      }
    },
    // render watch
    textTitle: "renderImage",
    textCommerce: "renderImage",
    typeProductSelectedLabel: "renderImage",
    textPromo: "renderImage",
    textPrice: "renderImage",
    textPriceNormal: "renderImage",
    sizePrice: "renderImage",
    textPricePromo: "renderImage",
    dateStart: "renderImage",
    dateEnd: "renderImage",
    backgroundImage: "renderImage",

    //Validate watch
    brandSelectedImg: "valdiateStep1",
    promoSelected: "valdiateStep1",
  },
  methods: {
    renderImage() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const imagen = new Image();
      imagen.crossOrigin = "Anonymous";
      imagen.src = this.backgroundImage;
      imagen.onload = () => {
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        context.drawImage(imagen, 0, 0);

        // Título
        this.drawText(context, this.textTitle.toString(), this.settingTitle);

        // Numero de cantidad
        this.drawText(context, this.textPromo.toString(), this.settingQty);

        // Descripción del producto
        this.drawText(
          context,
          this.typeProductSelectedLabel,
          this.settingDescription
        );

        // Precio de la promoción
        if (this.textPriceNormal && this.textPricePromo) {
          // Precio antes Label
          this.drawText(context, "Precio antes", this.settingPriceBeforeLabel);

          // Precio antes
          this.drawText(
            context,
            this.formatCurrency(this.textPriceNormal),
            this.settingPriceBeforeValue
          );

          // Precio después label
          this.drawText(context, "Ahora", this.settingPriceAfterLabel);

          // Precio después
          this.drawText(
            context,
            this.formatCurrency(this.textPricePromo),
            this.settingPriceAfterValue
          );
        } else {
          let text = "Por solo";
          this.drawText(context, text, this.settingPriceLabel);

          // Precio Unitario
          this.drawText(
            context,
            this.formatCurrency(this.textPrice),
            this.settingPriceValue
          );
        }
        // Lugar o establecimiento
        this.drawText(context, this.textCommerce, this.settingCommerce);

        // Fechas de vigencia
        let validityPromo = `Vigencia ${this.dateStart} hasta ${this.dateEnd}`;
        this.drawText(context, validityPromo, this.settingValidity);
      };

      // Valdiate Form
      this.valdiateStep2();
    },
    validateForm() {
      ElNotification({
        title: "Error",
        message: "Completar todos los campos",
        type: "error",
      });
    },
    valdiateStep1() {
      if (this.step === 1) {
        this.isValid1 = this.brandSelectedImg !== "";
        // &&  this.promoSelected !== ''
      }
    },

    valdiateStep2() {
      if (this.textPriceNormal !== "" && this.textPricePromo !== "") {
        this.isValid2 =
          this.textTitle !== "" &&
          this.textCommerce !== "" &&
          this.backgroundImage !== "" &&
          this.typeProductSelectedLabel !== "" &&
          this.dateStart !== null &&
          this.dateEnd !== null &&
          this.textPriceNormal.length > 2 &&
          this.textPricePromo.length > 2;
      } else {
        this.isValid2 =
          this.textTitle !== "" &&
          this.textCommerce !== "" &&
          this.backgroundImage !== "" &&
          this.typeProductSelectedLabel !== "" &&
          this.dateStart !== null &&
          this.dateEnd !== null &&
          this.textPrice !== "" &&
          this.textPrice.length > 2;
      }
    },

    validateDataProps(props) {
      if (
        props.title !== undefined &&
        props.qty !== undefined &&
        props.description_prod !== undefined &&
        props.price_before_label !== undefined &&
        props.price_before_value !== undefined &&
        props.price_after_label !== undefined &&
        props.price_after_value !== undefined &&
        props.price_label !== undefined &&
        props.price_value !== undefined
      ) {
        return true;
      } else {
        ElNotification({
          title: "Error",
          message: "No es posible usar este producto.",
          type: "error",
        });
        return false;
      }
    },

    changeTypeProduct() {
      this.getPropsBrand(this.typeProductSelected.id);
    },

    /**
     * Draws text on a canvas context with specified settings.
     *
     * @param {CanvasRenderingContext2D} context - The canvas context to draw on.
     * @param {string} text - The text to draw.
     * @param {object} setting - The settings for the text.
     * @param {string} setting.positionX - The x-coordinate of the starting position of the text.
     * @param {string} setting.positionY - The y-coordinate of the starting position of the text.
     * @param {string} setting.maxWidth - The maximum width of the text.
     * @param {string} setting.fontSize - The font size of the text.
     * @param {string} setting.lineHeight - The line height of the text.
     * @param {string} setting.fontWeight - The font weight of the text.
     * @param {string} setting.decoration - The decoration of the text (e.g. 'line-through').
     * @param {string} color - The color of the text.
     * @param {string} fontFamily - The font family of the text.
     */
    drawText(context, text, setting) {
      let x = setting.positionX;
      let y = setting.positionY;
      let maxWidth = setting.maxWidth;
      let color = setting.color;
      let fontFamily = setting.fontFamily;
      let fontSize = setting.fontSize;
      let lineHeight = setting.lineHeight;
      let fontWeight = setting.fontWeight;
      let decoration = setting.decoration;

      if (setting.heightBox !== undefined && setting.widthBox !== undefined) {
        // Usar las dimensiones especificadas
        maxWidth = setting.widthBox;
        let targetHeight = setting.heightBox;

        // Función para calcular el texto con un tamaño de fuente dado
        const calculateTextSize = (testFontSize) => {
          context.font = `${fontWeight} ${testFontSize}px ${fontFamily}`;
          let testLineHeight = testFontSize * 1.2; // Proporción para lineHeight

          let testWords = text.split(" ");
          let testLine = "";
          let testLines = [];

          for (let n = 0; n < testWords.length; n++) {
            const tempLine = testLine + testWords[n] + " ";
            const metrics = context.measureText(tempLine);
            const tempWidth = metrics.width;

            if (tempWidth > maxWidth && n > 0) {
              testLines.push(testLine);
              testLine = testWords[n] + " ";
            } else {
              testLine = tempLine;
            }
          }

          testLines.push(testLine);
          let totalHeight = testLines.length * testLineHeight;

          return {
            height: totalHeight,
            lines: testLines,
            lineHeight: testLineHeight,
          };
        };

        // Búsqueda binaria para encontrar el tamaño de fuente óptimo
        let minFontSize = 8; // Tamaño mínimo legible
        let maxFontSize = 72; // Tamaño máximo razonable
        let optimalSize = fontSize; // Comenzar con el tamaño proporcionado
        let result = calculateTextSize(optimalSize);

        // Solo realizar ajustes si el texto no cabe en las dimensiones dadas
        if (result.height > targetHeight) {
          // Reducir tamaño si es demasiado grande
          while (minFontSize <= maxFontSize) {
            let midFontSize = Math.floor((minFontSize + maxFontSize) / 2);
            result = calculateTextSize(midFontSize);

            if (result.height <= targetHeight) {
              optimalSize = midFontSize;
              minFontSize = midFontSize + 1;
            } else {
              maxFontSize = midFontSize - 1;
            }
          }
        } else if (result.height < targetHeight * 0.8) {
          // Aumentar tamaño si hay mucho espacio disponible
          while (minFontSize <= maxFontSize) {
            let midFontSize = Math.floor((minFontSize + maxFontSize) / 2);
            result = calculateTextSize(midFontSize);

            if (result.height <= targetHeight) {
              optimalSize = midFontSize;
              minFontSize = midFontSize + 1;
            } else {
              maxFontSize = midFontSize - 1;
            }
          }
        }

        // Aplicar el tamaño óptimo encontrado
        fontSize = optimalSize;
        lineHeight = result.lineHeight;
      }

      context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      context.textBaseline = "top"; // Cambiado a 'top' para mejor alineación

      let words = text.split(" ");
      let line = "";
      let lines = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }

      lines.push(line);
      const textHeight = lines.length * lineHeight;

      // Calcular el desplazamiento vertical para centrar el texto si hay heightBox
      let verticalOffset = 0;
      if (setting.heightBox) {
        verticalOffset = (setting.heightBox - textHeight) / 2;
      }

      // Dibujar el texto línea por línea, con el desplazamiento vertical para centrar
      context.fillStyle = color;
      for (let i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, y + verticalOffset + i * lineHeight);
      }

      // Dibujar la línea de decoración si es necesario
      if (decoration === "line-through") {
        context.beginPath(); // Necesario para iniciar un nuevo trazo
        context.moveTo(x, y + verticalOffset + lineHeight / 2); // Ajustado con el offset vertical
        context.lineTo(
          x + context.measureText(line).width,
          y + verticalOffset + lineHeight / 2
        );
        context.strokeStyle = color;
        context.lineWidth = 5;
        context.stroke();
      }
    },
    formatCurrency(number) {
      number = parseInt(number);
      if (typeof number !== "number" || isNaN(number)) {
        return "$";
      }

      // Formatear el número como moneda con separadores de miles y el símbolo de moneda $
      const valueFormat = number.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });

      return valueFormat.replace(/\s/g, "");
    },
    downloadImage() {
      const canvas = this.$refs.canvas;
      const enlace = document.createElement("a");
      enlace.download = "Promo-Render.jpg";
      enlace.href = canvas.toDataURL("image/jpeg", 1);
      enlace.click();
    },

    async shareImage() {
      const canvas = this.$refs.canvas;

      if (navigator.share) {
        try {
          // Convertir el canvas a un Blob
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 1)
          );
          const file = new File([blob], "Promo-Render.jpg", {
            type: "image/jpeg",
          });

          await navigator.share({
            files: [file],
            title: "Mi Imagen",
            text: "¡Mira esta imagen!",
          });
          ElNotification({
            title: "Exito",
            message: "Imagen compartida exitosamente",
            type: "success",
          });
        } catch (error) {
          ElNotification({
            title: "Error",
            message: "Error al compartir",
            type: "error",
          });
        }
      } else {
        ElNotification({
          title: "Error",
          message: "Tu navegador no soporta la función de compartir",
          type: "error",
        });
      }
    },

    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
      if (this.step === 3) {
        this.reloadImage();
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },

    async reloadImage() {
      this.loading = true;
      var backTextPromo = this.textPromo;
      this.textPromo = 0;
      this.renderImage();
      setTimeout(() => {
        this.textPromo = backTextPromo;
        this.renderImage();
        setTimeout(() => {
          const canvas = this.$refs.canvas;
          this.imageFinal = canvas.toDataURL("image/jpeg", 1);
          this.loading = false;
        }, 1000);
      }, 1000);
    },

    async getBrands() {
      try {
        this.loading = true;
        const url = this.url_ajax + "/modules/advertising_generator/ajax.php";
        const response = await axios.get(
          `${url}?action=get_data_brands&token=1234567890`
        );
        // console.log(response.data);
        this.brandsOptions = response.data.list_brands;
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
      } finally {
        this.loading = false;
      }
    },

    async getDataBrand() {
      try {
        this.loading = true;
        const url = this.url_ajax + "/modules/advertising_generator/ajax.php";
        const response = await axios.get(
          `${url}?action=get_data_brand&id_brand=${this.brandSelected}&token=1234567890`
        );
        this.typeProduct = response.data.list_products;
        // Reset Select Type Product (Case before product selected)
        this.typeProductSelected = "";
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
      } finally {
        this.loading = false;
      }
    },

    async getPropsBrand(typeProduct) {
      try {
        this.loading = true;
        const url = this.url_ajax + "/modules/advertising_generator/ajax.php";
        const response = await axios.get(
          `${url}?action=get_props_product&id=${typeProduct}&token=1234567890`
        );
        this.backgroundOptions = response.data.list_props;
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    selectedImageUrl() {
      const selectedOption = this.brandsOptions.find(
        (option) => option.value === this.brandSelected
      );
      return selectedOption ? selectedOption.imageUrl : "";
    },

    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
};
</script>
