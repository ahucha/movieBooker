const people = [
    { name: "Alice", age: 22 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 18 },
    { name: "David", age: 25 },
    { name: "Eva", age: 35 },
  ];
  
  function filterByAge(array, minAge) {
    return array.filter(person => person.age >= minAge);
  }
  
  function filterByName(array, namePart) {
    return array.filter(person =>
      person.name.toLowerCase().includes(namePart.toLowerCase())
    );
  }
  
  const adults = filterByAge(people, 21);
  console.log("Personnes âgées de 21 ans ou plus :", adults);
  
  const filteredByName = filterByName(people, "a");
  console.log("Personnes dont le nom contient 'a' :", filteredByName);
  