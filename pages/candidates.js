import React, { useState } from 'react';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../styles/candidates.module.css';
// components
import Card from '../components/Card';
import Cloudinary from '../components/Cloudinary';

export default function Candidates() {
  const router = useRouter();
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [nick, setnick] = useState('');
  const [matric, setmatric] = useState('');
  const [level, setlevel] = useState('');
  const [position, setposition] = useState('');
  // const [active, setactive] = useState(false);
  const [error, setError] = useState('');
  const [img, setimg] = useState('');

  const [fn, setfn] = useState(false);
  const [ln, setln] = useState(false);
  const [nn, setnn] = useState(false);
  const [mt, setmt] = useState(false);
  const handleEvent = (i) => {
    `set${i}`(true);
  };
  const handleBlur = (i) => {
    inputs[i] === '' && `set${i}`(false);
  };
  const inputs = [fname, lname, nick, matric];
  const labels = [setfn, setln, setnn, setmt];
  const handleChange = (i) => {
    inputs[i] === '' && labels[i](false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data['fname'] = fname.trim();
    data['lname'] = lname.trim();
    data['nick'] = nick.trim();
    data['matric'] = matric.trim().toUpperCase();
    data['level'] = level.trim();
    data['position'] = position.trim();
    data['img'] = img;
    if (
      (data.fname === '' ||
        data.lname === '' ||
        data.nick === '' ||
        data.level === '' ||
        data.position === '',
      data.matric === '')
    ) {
      setError('All fields are required');
      // } else if (data.matric.length !== 15) {
      //   setError('Matric number must be 15 characters');
    } else if (data.img === '') {
      setError('Please upload a passport');
    } else {
      const res = await fetch(process.env.HOST + '/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const d = await res.json();
      if (res.status === 200) {
        router.push('/dashboard');
      } else {
        setError(d.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Candidate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WidgetLoader />
      <main className={styles.main}>
        <div className={styles.can_cont}>
          <Card>
            <section>
              <div className={styles.content}>
                <div className={styles.heading}>AET AWARD NOMINATION</div>{' '}
                <Cloudinary img={img} setimg={setimg} />
                <section className={styles.full__width}>
                  {error !== '' && <p className={styles.error}>{error}</p>}
                  <form
                    className={styles.form}
                    action="/api/register"
                    method="POST"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <div
                      className={
                        img !== ''
                          ? styles.input_group_first
                          : styles.input_group
                      }
                    >
                      <input
                        className={styles.input}
                        autoComplete="off"
                        name="fname"
                        type="text"
                        required=""
                        value={fname}
                        onChange={(e) => setfname(e.target.value)}
                        onFocus={() => setfn(true)}
                        onBlur={() => handleChange(0)}
                      />
                      <label
                        className={fn ? styles.label_active : styles.label}
                      >
                        First Name
                      </label>
                    </div>
                    <div className={styles.input_group}>
                      <input
                        className={styles.input}
                        autoComplete="off"
                        name="lname"
                        type="text"
                        required=""
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        onFocus={() => setln(true)}
                        onBlur={() => handleChange(1)}
                      />
                      <label
                        className={ln ? styles.label_active : styles.label}
                      >
                        Last Name
                      </label>
                    </div>
                    <div className={styles.content_inline}>
                      <div className={styles.input_group}>
                        <input
                          className={styles.input}
                          autoComplete="off"
                          name="nick"
                          type="text"
                          required=""
                          value={nick}
                          onChange={(e) => setnick(e.target.value)}
                          onFocus={() => setnn(true)}
                          onBlur={() => handleChange(2)}
                        />
                        <label
                          className={nn ? styles.label_active : styles.label}
                        >
                          Nickname
                        </label>
                      </div>
                      <div className={styles.level}>
                        <select
                          className={styles.level_select}
                          name="level"
                          id="level"
                          value={level}
                          onChange={(e) => setlevel(e.target.value)}
                        >
                          <option value="" disabled>
                            Level
                          </option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="400">400</option>
                          <option value="500">500</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <input
                        className={styles.input}
                        autoComplete="off"
                        name="matric"
                        type="text"
                        required=""
                        value={matric}
                        onChange={(e) => setmatric(e.target.value)}
                        onFocus={() => setmt(true)}
                        onBlur={() => handleChange(3)}
                      />
                      <label
                        className={mt ? styles.label_active : styles.label}
                      >
                        Matric Number
                      </label>
                    </div>
                    <div className={styles.position}>
                      <select
                        name="position"
                        className={styles.position_select}
                        value={position}
                        onChange={(e) => setposition(e.target.value)}
                      >
                        <option value="" disabled>
                          Position
                        </option>
                        <option value="Most Influential">
                          Most influential{' '}
                        </option>
                        <option value="Best photographer of the year">
                          Best photographer of the year
                        </option>
                        <option value="Most Social">Most Social</option>
                        <option value="Face of 100level">
                          Face of 100Level
                        </option>
                        <option value="Face of 200level">
                          Face of 200Level
                        </option>
                        <option value="Face of 300level">
                          Face of 300Level
                        </option>
                        <option value="Face of 400level">
                          Face of 400Level
                        </option>
                        <option value="Face of 500level">
                          Face of 500Level
                        </option>
                        <option value="Slim shady">Slim shady</option>
                        <option value="Mr ebony">Mr ebony</option>
                        <option value="Mrs ebony">Mrs ebony</option>
                        <option value="Fresher with prospect">
                          Fresher with prospect
                        </option>
                        <option value="Most expensive">Most expensive</option>
                        <option value="Face of AEC">Face of AEC</option>
                        <option value="Face of AER">Face of AER</option>
                        <option value="Best class Rep">Best class Rep</option>
                        <option value="Most popular">Most popular</option>
                        <option value="Hour Glass">Hour Glass</option>
                        <option value="Best couple">Best couple</option>
                        <option value="Cool calm, and collected">
                          Cool calm, and collected
                        </option>
                        <option value="Sport person of the Year">
                          Sport person of the Year
                        </option>
                        <option value="Entertainer of the Year">
                          Entertainer of the Year
                        </option>
                        <option value="Most political">Most political</option>
                        <option value="Final year student of the year">
                          Final year student of the year
                        </option>
                        <option value="Mr money with the vibe">
                          Mr money with the vibe
                        </option>
                      </select>
                    </div>

                    <button type="submit" className={styles.btn}>
                      Register
                    </button>
                  </form>
                </section>
              </div>
            </section>
          </Card>
        </div>
      </main>
    </>
  );
}
