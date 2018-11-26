# rangify

Create an array from a string of integer ranges.

## Usage

```js
const rangify = require('rangify');

rangify('1-3,5,9-10');
//=> ['1-3', '5', '9-10']

rangify('11,15-20');
//=> ['11', '15-20']
```

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details