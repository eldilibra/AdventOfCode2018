(require "str")

(defparameter *claimed-fabric* (make-hash-table :test 'equal))
(defparameter *inches-of-fabric-claimed* 0)
(defparameter *the-highlander-claims* ())

(with-open-file (stream "~/AdventOfCode2018/day-3/input-day-3")
    (do ((line (read-line stream nil)
               (read-line stream nil)))
        ((null line))
      (process-claim line)))

(print *inches-of-fabric-claimed*)
(print *the-highlander-claims*)

(defun parse-claim (raw-claim)
  ; this let* blocks tokenizes a claim by splitting on magic strings
  (let* ((id-and-claim (str:split " @ " raw-claim))
        (id (first id-and-claim))
        (claim (second id-and-claim))
        (position-and-dimensions (str:split ": " claim))
        (position (first position-and-dimensions))
        (left-and-top (str:split "," position))
        (left (parse-integer (first left-and-top)))
        (top (parse-integer (second left-and-top)))
        (dimensions (second position-and-dimensions))
        (width-and-height (str:split "x" dimensions))
        (width (parse-integer (first width-and-height)))
         (height (parse-integer (second width-and-height))))
    (values id left top width height)))

; gets claim ids for a square inch of fabric by its coordinates
(defun get-claim-ids (coordinate-key) (gethash coordinate-key *claimed-fabric* ()))

(defun process-claim (claim)
  (multiple-value-bind (id left top width height) (parse-claim claim)

   ; maybe this is the one?
   (push id *the-highlander-claims*)
   
   (loop for x from (+ left 1) to (+ left width)
         do (loop for y from (+ top 1) to (+ top height)
                  ; the coordinate key is just the x and y values of a given square inch of fabric with a squiggly in between
                  for coordinate-key = (concatenate 'string (write-to-string x) "~" (write-to-string y))

                  do (setf (gethash coordinate-key *claimed-fabric* ()) (append (get-claim-ids coordinate-key) (list id)))

                  ; a square inch of fabric that has exactly two claim ids should be counted as claimed
                  if (= (list-length (get-claim-ids coordinate-key)) 2)
                  do (incf *inches-of-fabric-claimed*)

                  ; nope, not the one, and neither are these other ids!
                  if (> (list-length (get-claim-ids coordinate-key)) 1)
                  do (setf *the-highlander-claims* (set-difference *the-highlander-claims* (get-claim-ids coordinate-key)))))))
