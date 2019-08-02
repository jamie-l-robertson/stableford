// https://www.codewars.com/kata/reviews/57865e7c802dadbf15000272/groups/57865e7d802dadbf15000274
function calculateStablefordScore(handicap, strokes, course) {
  // **** Validate handicap ****
  // Check handicap is an integer
  if (typeof handicap !== "number" || handicap !== Math.floor(handicap))
    throw "Handicap must be an integer";

  // Check handicap >=0 and <=36
  if (handicap < 0 || handicap > 36)
    throw "Handicaps must be in the range 0-36.";

  // **** Validate strokes ****
  // Check there are 18 scores
  if (strokes.length !== 18) throw "Must have exactly 18 strokes provided";

  // Check that strokes are positive integers
  if (
    strokes.reduce(function(a, v) {
      return a || typeof v !== "number" || Math.floor(v) !== v || v < 0;
    }, false)
  )
    throw "Strokes must be positive integers";

  // **** Validate course ****
  // Check there are 18 holes
  if (course.length !== 18) throw "Course length invalid";

  // Check each hole is described as SI/Par pair
  if (
    course.reduce(function(a, v) {
      return a || v.length !== 2;
    }, false)
  )
    throw "Invalid course map";

  // Check that SIs and Pars are positive integers
  if (
    course.reduce(function(a, v) {
      return a || typeof v[0] != "number" || typeof v[1] !== "number";
    }, false)
  )
    throw "Course details must be provided as positive integers";
  if (
    course.reduce(function(a, v) {
      return a || Math.floor(v[0]) !== v[0] || Math.floor(v[1]) !== v[1];
    }, false)
  )
    throw "Course details must be provided as positive integers";

  // Check there are 1-18 stroke indexes
  if (
    course.reduce(function(a, v) {
      return a || v[1] < 1 || v[1] > 18;
    }, false)
  )
    throw "Stroke index value must be 1-18";

  // Check all the pars are either 3,4, or 5
  if (
    course.reduce(function(a, v) {
      return a || v[0] < 3 || v[0] > 5;
    }, false)
  )
    throw "Par values must be 3-5";

  // Check there's no repeated Stroke Index values.
  var check_SI = [];
  if (
    course.reduce(function(a, v, i) {
      check_SI.push(v[1]);
      return a || check_SI.indexOf(v[1]) !== i;
    }, false)
  )
    throw "Duplicate stroke index found";

  // **** Now safe to calculate Stableford Score ****
  // Helper function to calculate handicap allowance on each hole
  var strokesReceivedOnHole = function(holeIndex) {
    var shots = 0;
    var tmpHandicap = handicap;
    var strokeIndex = course[holeIndex][1];
    if (tmpHandicap >= strokeIndex) {
      shots++;
      tmpHandicap -= 18;
      if (tmpHandicap >= strokeIndex) shots++;
    }
    return shots;
  };

  // Helper function calculate Stableford points on each hole
  var calculatePointsOnHole = function(holeIndex, shots) {
    var points = 0;
    points = 2 - (shots - course[holeIndex][0]);
    if (points < 0) points = 0;
    return points;
  };
  return strokes.reduce(function(a, v, i) {
    return (a +=
      v === 0 ? 0 : calculatePointsOnHole(i, v - strokesReceivedOnHole(i)));
  }, 0);
}

export default calculateStablefordScore;
