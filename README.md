# Índice

1. [Introducción](#introducción)
2. [Interés Compuesto](#interés-compuesto)
   - 2.1 [Fórmula de cálculo (tradicional)](#Fórmula-de-cálculo-tradicional)
   - 2.2 [Fórmula de cálculo (exponencial, con ahorro recurrente)](#Fórmula-de-cálculo-exponencial-con-ahorro-recurrente)

    
3. [Inflación](#inflación)
   - 3.1 [Formas de calcularla](#formas-de-calcularla)
      * 3.1.1 [Forma multiplicativa](#forma-multiplicativa)
      * 3.1.2 [Forma divisora](#forma-divisora)
      * 3.1.3 [Multiplicativa vs Divisora](#multiplicativa-vs-divisora)
4. [Implementación de la Aplicación Web](#implementación-de-la-aplicación-web)
   - 4.1 [Cálculos](#cálculos)
   - 4.2 [Gráfico de Variación del Capital por Inversión](#gráfico-de-variación-del-capital-por-inversión)
   - 4.3 [Disminución del Capital por Inflación (sin invertir el capital)](#disminución-del-capital-por-inflación-sin-invertir-el-capital)
   - 4.4 [Representación del Gráfico de Incremento de Renta vs. Gráfico de Decremento Inflacionario](#representación-del-gráfico-de-incremento-de-renta-vs-gráfico-de-decremento-inflacionario)
   - 4.5 [Cálculo del Punto de Corte del Gráfico de Incremento de Renta y el Gráfico de Decremento Inflacionario](#cálculo-del-punto-de-corte-del-gráfico-de-incremento-de-renta-y-el-gráfico-de-decremento-inflacionario)
5. [Conclusiones](#conclusiones)
6. [Anexo](#anexo)
   - 6.1 [Acertijo](#acertijo)
   - 6.2 [Crecimiento del dinero de Luís (lineal, con ahorro recurrente)](#crecimiento-del-dinero-de-luís-lineal-con-ahorro-recurrente)
   - 6.3 [Crecimiento del dinero de Eulàlia (exponencial, con ahorro recurrente)](#crecimiento-del-dinero-de-eulàlia-exponencial-con-ahorro-recurrente)
   - 6.4 [Crecimiento lineal con ahorro recurrente vs. exponencial con ahorro recurrente](#crecimiento-lineal-con-ahorro-recurrente-vs-exponencial-con-ahorro-recurrente)
 



# Introducción

La inflación es una lacra producida por la impresión sin restricciones de moneda por parte de los bancos centrales (Reserva Federal en EEUU, Banco Central Europeo en Europa, Banco Central de la República Argentina, en Argentina, etc.). Al aumentar la masa monetaria de forma artificiosa para subvencionar el déficit presupuestario de los estados, empresas o individuos, permitiendo que estos se endeuden excesivamente a futuro y que esa deuda se eternalice y nunca se pague, se genera algo inevitable: el incremento de la masa monetaria sin que ello conlleve un incremento parejo de los bienes producidos. Esto, al menos bajo mi leal saber y entender, genera la inflación.

Si se mantuviese durante un período de 10 años la inflación interanual de entorno el 6 por ciento que tenemos ahora a finales de 2023, implicaría inevitablemente que el capital que la gente tenga en liquidez va a reducirse a la mitad. Reitero: <strong>la población española tiene el potencial de perder la mitad de su dinero en 10 años</strong> (o lo que es lo mismo: si hoy 30 000 euros compran un coche, en 10 años se necesitarán 60 000 para comprar un producto con el mismo nivel de correspondencia en la gama del fabricante que hayamos escogido).

Con este repositorio queremos cumplir una triple función: primero, generar una herramienta didáctica con la que poder explicar y calcular visualmente el <strong>interés compuesto</strong> de imposiciones a plazo, bonos del estado u otros instrumentos financieros que generen un retorno fijo anual; segundo, queremos enseñar y calcular visualmente <strong>el efecto que la inflación tiene en nuestro capital</strong> y como este efecto se puede representar mediante una "minoración" de la capacidad de compra de nuestro dinero con el paso de los años; finalmente, queremos proporcionar al lector y al usuario de esta aplicación web una herramienta para entender como evitar el efecto de la inflación sobre nuestros ahorros y así calcular cuántos años son necesarios para que un capital inicial que queremos preservar, al que denominaremos $Q$, no se pierda por efecto de la misma. Con este repositorio demostramos que es posible vencer la inflación si la rentabilidad de las inversiones es inferior a la inflación, mediante el interés compuesto.

La voz popular pone en boca de Einstein la frase: "El interés compuesto es la fuerza más poderosa de la galaxia". En este apartado y el siguiente vamos a ver por qué el interés compuesto es la clave para vencer la inflación.

# Interés compuesto

## Fórmula de cálculo (tradicional)

Si hoy tenemos 10 000 euros y ponemos ese dinero en un instrumento de renta fija, variable, etc. de tal modo que nos genere un 3% TIN neto (es decir, después de haber ajustado el TIN bruto a TIN neto descontándole el IRPF correspondiente -que aquí no mostraremos-) tendremos que:

En un año tendremos $Q(1)$:

$$ Q(1) = 10000 \cdot 1.03 = 10300 $$

En dos años nuestro capital habrá ascendido a:

$$ Q(2) = (10000 \cdot 1.03)*1.03= 10609 $$

En tres años:

$$ Q(3) = (10000 \cdot 1.03\cdot 1.03 )  \cdot 1.03 \approx 10927 $$

Y, por lo tanto, siguiendo el razonamiento inductivo es muy fácil ver que la fórmula general para calcular cuánto habrá crecido nuestro capital será simplemente una exponencial con exponente $n$ e interés en tanto por uno $i$, con capital inicial invertido $Q$:

$$ Q(n) = Q \cdot (1+i)^n $$

Si ahora lo que queremos determinar es <strong>solamente</strong> las ganancias netas a medida que van pasando los años podemos escribir la siguiente función $Q_{g}(n)$, que nos servirá para calcular el momento exacto en el que nuestras inversiones, de mantener un interés anual $i$ que sea compuesto año tras año, podrán vencer la minoración que la inflación produce sobre ese mismo capital (concretamente, es la función anterior a la que le restamos el capital inicial $Q$).

$$ Q_{g}(n) = Q(n)  - Q$$

$$ Q_{g}(n) = Q \cdot (1+i)^n - Q$$

## Fórmula de cálculo (exponencial, con ahorro recurrente)

Para esta sección remitimos al lector al anexo (véase [link](#Anexo)), dado que su complejidad técnica es mayor. Por ahora, podemos decir que la mejor forma de ahorrar puede ser reinvertir todos nuestros ahorros, no solamente unos ahorros iniciales. En este caso el incremento exponencial que produce el interés compuesto en el capital inicial invertido más la cantidad de ahorro que se produce anualmente en un salario tienen un efecto multiplicativo muy interesante.

# Inflación

## Formas de calcularla

El cálculo de la inflación es algo de lo que solamente se habla con respecto al año anterior (el IPC interanual, el IPC mensual...) No hay mucha información en el saber popular sobre el impacto que tiene la misma a lo largo de múltiples años a pesar del efecto devastador que tiene en la economía de los ahorradores como se ha especificado en la introducción. Se me ocurre hacer una estimación de cálculo de la misma en función del número $n$ de años que pasan, mediante dos funciones distintas, muy parecidas a la fórmula del interés compuesto.

### Forma multiplicativa

De forma análoga a lo que pasaba con el interés compuesto, la inflación funciona de forma similar. Con la fórmula de cálculo 1, que denominaremos $Q_{inf}(n)$, si hoy tenemos 10 000 euros pero el dinero no está invertido, con una inflación de 6% de interés interanual el potencial de compra del capital se iría "perdiendo" -a pesar de que mantuviésemos la misma cantidad-:

Por ejemplo, al cabo de un año podríamos comprar con 10 000 euros lo que ahora compraríamos con 9400 euros, dado que:

$$ Q_{inf}(1) = 10000 \cdot 0.94 = 9400 $$

En dos años podríamos comprar lo que ahora compran 8836 euros:

$$ Q_{inf}(2) = (10000 \cdot  0.94)* 0.94 = 8836 $$

Y en tres años:

$$ Q_{inf}(3) = (10000 \cdot 0.94\cdot 0.94 )  \cdot 0.94 \approx 8305.84 $$

Y así sucesivamente. Por lo tanto, desarrollando el razonamiento inductivo que acabamos de empezar es muy fácil ver que la fórmula general para cuantificar a cuánto habrá "decrecido" nuestro capital debido a la inflación (o a cuánto habrá decrecido el potencial de compra del mismo, en el futuro) es usar una función donde a nuestro capital inicial $Q$ lo multiplicamos por un tanto por uno de "descuento" anual, al que denominaremos $1 - i^{'}$. En esta fórmula, i' será "interés inflacionario" del dinero (en españa el IPC), según la siguiente expresión $Q_{inf}(n)$ [^0]:

$$ Q_{inf}(n) = Q \cdot (1-i^{'})^n $$

Para esta forma de cálculo podemos sacar las "pérdidas" inflacionarias a lo largo de los $n$ años que pasan desde el momento inicial que consideremos para nuestro capital inicial, de forma análoga a como hicimos con las la fórmula de variación del capital mediante interés compuesto $Q(n)$ mediante la expresión de ganancias del interés compuesto $Q_{g}(n)$, pero ahora generando la función $Q_{p[Inf]}(n)$ (<strong>cantidad de pérdidas inflacionarias en función del número de años</strong>) que proponemos a continuación:

$$ Q_{p[Inf]}(n) = Q - Q_{inf}(n) $$

$$ Q_{p[Inf]}(n) = Q - Q \cdot (1-i^{'})^n $$

Siendo esta fórmula de cálculo idéntica a la que implementan los desarrolladores en la aplicación bancaria de BBVA, al menos, a fecha de septiembre-octubre de 2023.

### Forma divisora

La otra forma de calcular la inflación, a la que denominaremos  $Q^{'}_{inf}(n)$, es tomando la fórmula del interés compuesto clásica $Q(n)$ pero modificarla de tal modo que en lugar de multiplicar la cantidad incial $Q$ por el factor $(1 + i)^n$, la divida (que es como algunas calculadoras online están implementadas, al menos a octubre de 2023, como, por ejemplo, esta página web de reino unido: ([wesleyan.co.uk](https://www.wesleyan.co.uk/savings-and-investments/inflation-calculator)): 

$$ Q^{'}_{inf}(n) = \dfrac{Q}{(1+i^{'})^n} $$

Y para las pérdidas:

$$ Q_{p'[Inf]}(n) = Q - \dfrac{Q}{(1+i^{'})^n} $$



### Multiplicativa vs Divisora

Ambas formas de cálculo de la inflación parecen efectivas. Son muy parecidas, pero no son iguales. Para todo valor de $n > 0$ vemos que la <em>forma 1</em> implica estimar mayores pérdidas por inflación con el paso del tiempo que la <em>forma 2</em> ya que tenemos:

$$Q_{inf}(n) < Q^{'}_{inf}(n)$$

$$Q \cdot (1-i^{'})^n \lt \dfrac{Q}{(1+i^{'})^n}$$

 Por lo tanto, aunque ambas funciones puedan ser buenas candidatas para estimar la inflación, para las estimaciones inflacionarias tomaremos la <em>forma 1</em>, es decir $Q_{inf}(n)$ y su variante para calcular pérdidas $Q_{p[Inf]}(n)$, por ser <strong>más conservadora</strong>.

# Implementación de la aplicación web

## Cálculos

La idea de nuestro programa es hacer una aplicación web que dada una inflación entrada por el usuario y un tipo de interés que el mismo pueda ganar con sus inversiones, muestre:

1) Un gráfico de como <underline>incrementa el capital</underline> con el <strong>interés compuesto</strong>.

2) Un gráfico que muestre como <underline>"decrementa" el capital</underline> debido a la <strong>inflación</strong>: este gráfico podremos mirarlo como "<i>con la inflación que habrá desde ahora mismo hasta un determinado año $n$ cuánto dinero del que tengo ahora podría comprar lo mismo que dentro de $n$ años </i>". Es decir, si tengo 10 000 euros hoy y la inflación es de un  100 por ciento al año, el año que viene seguiré teniendo 10 000 euros, sí, pero solo podré comprar lo mismo que hoy comprarían 5 000 euros (porque en un año, de media, las cosas van a costar el doble).

3)  Un gráfico que represente nuestras ganancias año a año, por un lado; y nuestras pérdidas por inflación en valor absoluto también año a año, por el otro. Además, sería interesante que mostrase una aproximación al punto de corte de ambas funciones de forma análoga a como lo hace google con su sistema. Este punto tres es algo inédito que no hemos visto en ninguna función de cálculo para la inflación. Y hay que añadir algo MUY importante: nótese que crece más rápido la función que incrementa el dinero con interés compuesto ( $Q(n)$ ) que no lo rápido que decrece la función que muestra el decrecimiento por inflación ( $Q_{inf}(n)$ ). Por lo tanto, y por poner un ejemplo, con un interés medio del 3 por ciento que se puede obtener ahora mismo en depósitos españoles podemos vencer una inflación del 6 por ciento, en 17 años, si lo hacemos bien tomando beneficios del interés compuesto.

## Gráfico de variación del capital por inversión

En la aplicación web queremos mostrar $Q(n)$, de forma análoga a como lo muestra google. Para $Q = 100 000$ euros de capital inicial y un interés compuesto $i = 0.03$ (3%) la función exponencial en el buscador queda de este modo:

![No mostra exponencial](imagenes/image.png)

Y en nuestra aplicación web queda así:

TO DO

## Disminución del capital por inflación (sin invertir el capital)

En la aplicación web queremos mostrar la función $Q_{inf}(n)$, como google. Igual que en el caso anterior, para 100 000 euros de capital inicial y para $i^{'} = 0.06$ (inflación del 6%) en el buscador queda:

![no mostra reduccio exponencial](imagenes/image-1.png)

Y en nuestra aplicación web (en este caso para una cantidad de 2queda así:

![no mostra reduccio exponencial](imagenes/disminucioPerInflacio.png)


## Representación del gráfico de incremento de renta vs. gráfico de decremento inflacionario


En la aplicación web también queremos mostrar la función de ganancias acumuladas a lo largo de los años $Q_{g}(n)$ (en azul) en relación a las pérdidas producidas por la inflación en un capital que no obtiene rentabilidad $Q_{p'[Inf]}(n)$ (en rojo), de la misma forma que lo muestra google. Por ejemplo, para una cantidad inicial $Q$ de 100 000 euros google nos muestra:

![grafico de google no se pudo mostrar](imagenes/incrementoDecrementoGoogle.png)

Y en nuestra aplicación web se ve así: 

![grafic inflacio vs interes compost no s ha pogut mostrar](imagenes/Inflacio_vs_interesCompost.png)

En este gráfico la importancia está encontrar el momento en que se produce el punto de corte entre ambas funciones, como veremos en el siguiente apartado.

## Cálculo del punto de corte del gráfico de incremento de renta y el gráfico de decremento inflacionario


Como decíamos en el apartado anterior, el punto de corte entre las funciones $Q_{g}(n)$ y $Q_{p'[Inf]}(n)$ es importante porque el número de años (variable $n$) al que ambas funciones cortan es el número de años que hay que estar invertiendo el dinero con interés compuesto $i$ para no perderlo por una supuesta inflación constante $i'$.

Para encontrar el punto de corte podríamos tratar de sustituir los valores $i$ e $i^{'}$ tanto en la función que hemos visto para las ganancias de los intereses ( $Q_{g}(n)$ ) y para la función de pérdidas producidas por la inflación mediante la FORMA 1 de cálculo ( $Q_{p[Inf]}(n)$ ), respectivamente. Igualándolas podemos intentar obtener n en función de $i$ y de $i^{'} ( $n(i,i^{'}) )$ manipulando algebraicamente:

$$Q_{g}(n) = Q_{p[Inf]}(n)$$

Es decir:

$$Q \cdot (1+i)^n - Q = Q - Q \cdot (1-i^{'})^n$$

Operando en la expresión anterior, podemos acercarnos a la obtención de $n(i,i')$ (n en función de $i$ e $i'$ ):

$$Q \cdot (1+i)^n - Q = Q - Q \cdot (1-i^{'})^n$$

$$Q \cdot (1+i)^n - 2Q = - Q \cdot (1-i^{'})^n$$

$$-(1+i)^n + 2 = (1-i^{'})^n$$

$$(1-i^{'})^n + (1+i)^n = 2$$


Para obtener la expresión $n(i,i^{'})$ (n en función del interés de la inversión $i$ y de la inflación $i^{'}$ ) como deseábamos con la última ecuación nos hemos dado cuenta que no se puede conseguir mediante técnicas numéricas algebraicas tradicionales; son necesarias técnicas computacionales o métodos numéricos para obtenerla[^1]. Hemos usado la representación de funciones de google para que en una inflación del 6% ( $i^{'}=0.06$ ) y un interés en las inversiones del 3% ( $i^{'}=0.03$ ) en cuántos años $n$ podremos vencer la inflación tratando de solucionar la expresión:

$$ (1 - 0.06)^n + (1 + 0.03)^n = 2$$
$$ 0.94^n + 1.03^n = 2$$

Y el resultado ha sido el siguiente:

$$n = 16.922$$

Es decir, con la inflación al 6% anual y las inversiones en interés compuesto rindiendo un 3% anual <strong>podemos vencer la inflación en poco menos de 17 años, independientemente de la cantidad inicial $Q$ que tengamos</strong>.






# Conclusiones

<strong>TO DO</strong>

# Anexo

## Acertijo

Hace tiempo leí la siguiente pregunta: 

"_Luís cobra 10 000 euros al mes, ahorra la mitad de esa candidad mensualmente y no invierte su dinero. Eulàlia cobra 3000 euros al mes, ahorra 2000 euros porque vive "frugalmente" y sí invierte su dinero. ¿Quien ahorra más? ¿Luís o Eulàlia?_"

Es una pregunta muy abierta pero, para responderla, es crucial estimar qué porcentaje anual puede conseguir _Eulàlia_ en sus inversiones y así comparar el crecimiento del dinero de _Eulàlia_ en comparación con el de _Luís_. Si bien luís tiene un elevado salario y su ahorro es gradual, podría verse superado por el de _Eulàlia_ con el paso del tiempo. La cuestión es: ¿cuándo? ¿Se va a producir durante la vida de _Eulàlia_? Vamos a asumir que _Eulàlia_ consigue un interés anual neto sobre su capital, año a año, del 3 por ciento.

## Crecimiento del dinero de Luís (lineal, con ahorro recurrente)

La función que identificaría el crecimiento del dinero que luís ahorra cada año (Q) en función del tiempo en años (n) sería una función $L(n)$ que sería, pues, lineal:

$$L(t) = Qt$$

Que en el caso particular: 

$$L(t) = 5000 \cdot 12 \cdot t =  60000t$$

## Crecimiento del dinero de Eulàlia (exponencial, con ahorro recurrente)

El caso de Eulàlia sería distinto. El crecimiento de su dinero sería exponencial y, además, habría que tener en cuenta un ahorro recurrente, digamos, anual. Así pues, la función $E(n)$ sería un poco más compleja.

Para construirla asumamos que cuando pasa el primer año de ahorro, todo lo que ha conseguido acumular _Eulàlia_ exclusivamente de su salario anual (llamémoslo $Q'$) lo invierte entonces un interés anual de un 3% ($i = 0.03$ ). Si tomamos estos datos, al final del primer año _Eulàlia_ tendría una cantidad $E(1)$ igual a $Q'$. Para los siguientes años, si en lugar de tomar $1 + i$ como coeficiente de incremento tomamos $1.03$ tenemos que su dinero crece así:

$$ 
\begin{align*} 
   E(1) & = Q' \\
   E(2) & = Q' \cdot 1.03 + Q' \\
   E(3) & = (Q' \cdot 1.03 + Q') \cdot 1.03 + Q'\\
   E(4) & = ((Q' \cdot 1.03 + Q') \cdot 1.03 + Q') \cdot 1.03 + Q'
\end{align*}
$$

Es decir, el dinero de Eulàlia generaría interés compuesto, pero añadiendo cada año una cantidad de salario acumulado Q'.

Si nos fijamos bien podemos reescribir las expresiones anteriores así:

$$ 
\begin{align*} 
   E(1) & = Q' \\
   E(2) & = Q' \cdot 1.03 + Q' \\
   E(3) & = Q' \cdot 1.03^{2} + Q' \cdot 1.03 + Q'\\
   E(4) & = Q' \cdot 1.03^{3} + Q' \cdot 1.03^{2} + Q' \cdot 1.03+ Q'
\end{align*}
$$

Y de ellas podemos sacar una ley general para el caso de Eulàlia:

$$ E(n) = Q' \cdot 1.03^{n-1} +  Q' \cdot 1.03^{n-2} + [...] + Q' \cdot 1.03 + q$$

Que factorizando quedaría:

$$ E(n) = Q' \cdot (1.03^{n-1} +  1.03^{n-2} + [...] +  1.03 + 1)$$

Y considerando la propiedad asociativa de la suma podemos reescribir los sumandos del paréntesis de menor a mayor (ahora están de mayor a menor) y representarlos con un sumatorio, tal que así:

$$ E(n) = Q' \cdot \sum_{i=0}^{n-1} 1.03^{i}$$

Para hacer una ley general no dependiente de un tipo de interés particular podemos sustituir $1.03$ por $1 + i$ en la expresión anterior, reescribiéndola de este modo:

$$ E(n) = Q' \cdot \sum_{j=0}^{n-1} (1 + i)^{j}$$

En el caso de Eulàlia el crecimiento de su dinero podríamos obtenerlo sustituyendo $Q'$ por los 2000 euros a lo largo de 12 meses y dejando el tipo de interés al 3 por ciento como antes:

$$ E(n) = 24000 \cdot \sum_{i=0}^{n-1} (1.03)^{i}$$



## Crecimiento lineal con ahorro recurrente vs. exponencial con ahorro recurrente

Vamos a comparar como crece el dinero de _Luís_ $L(n)$ con respecto al de _Eulàlia_ $E(n)$ con las funciones que hemos visto para cada uno de ellos:

$$ 
\begin{align*} 
   L(n) & =  60000n \\
   E(n) & = 24000 \cdot \sum_{i=0}^{n-1} (1.03)^{i} \\
\end{align*}
$$

Damos valores a los distintos años desde que empezamos a invertir (separador de miles, un punto):


<div align="center">

| n  |   L(n)   |     E(n)       |
|:--:|:--------:|:--------------:|
| 1  |  60.000   |     24.000    |
| 2  | 120.000   |     48.720    |
| 3  | 180.000   |     74.182    |
| 4  | 240.000   |    100.407    |
| 5  | 300.000   |    127.419    |
| 6  | 300.000   |    155.242    |
| .. |    ..     |      ..       |
| 55 | 3.300.000 |  3.265.719    |
| 56 | 3.360.000 |  3.387.690    |


</div>

_Eulàlia_, invirtiendo a un tres por ciento anual, tendrá más patrimonio que David cuando lleve 56 años invirtiendo. ¡Doradas sean las bondades del interés compuesto! Puede que ella pueda permitirse un mejor ataúd que Luís, aunque siendo tan frugal probablemente habrá dejado en su testamento que su familia compre el más barato de todos...

¿Y qué hubiese pasado si _Eulàlia_ hubiese conseguido una rentabilidad del 10 por ciento anual? Pues que hubiese ganado a Luís en solo 18 años y hubiese amasando más de un millón de euros (1.094.380 €). Algo irreal, por supuesto, porque en búsqueda de una rentabilidad tan grande probablemente caería en estafas piramidales; por ejemplo, habría invertido en deuda de estados o empresas fallidos/as que no devuelven el dinero (Islandia, crisis financiera de 2008 a 2010[^2]; Albania, esquemas piramidales de 1997[^3]) o en estafas relacionadas con las criptomonedas en donde los fundadores de los exchange se quedan todo o gran parte del capital (véanse las estafas piramidales de FTX con Sam Bankman Fried[^4], del exchange canadiense QuadrigaCX[^5], o la criptomoneda OneCoin acuñada por Ruja Ignatova[^6] calificada por el new york times como una de las estafas más grandes de la historia).

En resumen, que _Eulàlia_ seguirá siendo pobre independientemente de lo que haga. Pero, con la inversión sí puede aspirar a que el dinero crezca a un ritmo igual o superior al de la inflación de modo que le dinero guardado que quede en líquido mantenga su valor.

Para ver como calcular el crecimiento del dinero de _Eulàlia_ y de Luís tenemos sendas funciones. Aquí abajo ponemos la función $E(n)$ con la que hemos visualizado en la tabla anterior la evolución del patrimonio de _Eulàlia_ a lo largo del tiempo, junto con el bucle para imprimir las cantidades año a año:

https://github.com/blackcub3s/vencerLaInflacion/blob/03f95a763e086fc2bfc3dd46c1c8bc3cec5c37ad/scriptExponencialRecurrent.js#L10-L33






[^0]: Q de cantidad inflacionada (proveniente del catalán: "quantitat").

[^1]: Un método numérico para hallar n, con el resto de valores conocidos es usar el método de bisección. Es una una espécie de búsqueda dicotómica en la que vamos aproximando de forma tentativa la solución a la ecuación.

[^2]: [https://en.wikipedia.org/wiki/2008%E2%80%932011_Icelandic_financial_crisis](https://en.wikipedia.org/wiki/2008%E2%80%932011_Icelandic_financial_crisis)

[^3]: [https://en.wikipedia.org/wiki/1997_Albanian_civil_unrest](https://en.wikipedia.org/wiki/1997_Albanian_civil_unrest)

[^4]: [https://es.wikipedia.org/wiki/Sam_Bankman-Fried](https://es.wikipedia.org/wiki/Sam_Bankman-Fried)

[^5]: [https://es.cointelegraph.com/news/bankrupt-crypto-exchange-quadrigacx-to-start-interim-distribution-of-funds](https://es.cointelegraph.com/news/bankrupt-crypto-exchange-quadrigacx-to-start-interim-distribution-of-funds)

[^6]: [https://ca.wikipedia.org/wiki/Ruja_Ignatova](https://ca.wikipedia.org/wiki/Ruja_Ignatova)