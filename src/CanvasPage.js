import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stats, Environment, Sparkles } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Matrix4, MeshStandardMaterial } from 'three'
import { ConvertedGltf } from './ConvertedGltf'
import { InstancedRock } from './InstancedRock'
import { ConvertedGltfShader } from './ConvertedGltfShader'
import { Suspense } from 'react'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function BasicGltf(props) {
  const gltf = useLoader(GLTFLoader, '/models/test2.glb')
  return <primitive {...props} object={gltf.scene} />

  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)

  // return (
  //   <mesh
  //     {...props}
  //     ref={ref}
  //     scale={clicked ? 1.5 : 0.5}
  //     onClick={(event) => click(!clicked)}
  //     onPointerOver={(event) => (event.stopPropagation(), hover(true))}
  //     onPointerOut={(event) => hover(false)}>
  //     <primitive object={gltf.scene} />
  //     <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
  //   </mesh>
  // )
}

function DracoGltf(props) {
  const gltf = useLoader(GLTFLoader, '/models/test3.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    loader.setDRACOLoader(dracoLoader)
  })

  const ref = useRef()

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 0.5}
      onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      // onPointerOut={(event) => hover(false)}
    >
      <primitive object={gltf.scene} />
      <meshPhysicalMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function InstancedCube(props) {
  const ref = useRef()

  useEffect(() => {
    ref.current.setMatrixAt(0, new Matrix4())
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, 1]} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </instancedMesh>
  )
}

export default function CanvasPage() {
  let instances = []
  for (let i = 0; i < 20; i++) {
    instances.push([])
    for (let j = 0; j < 20; j++) {
      instances[i].push(j)
    }
  }

  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}

      <DracoGltf position={[-5, 0, 0]} />

      <ConvertedGltf material={new MeshStandardMaterial({ color: 'red' })} position={[5, 0, 0]} />

      <ConvertedGltfShader position={[3, 0, 5]} rotation={[0, 0, 0]} scale={10} />

      {/* <InstancedRock /> */}

      {/* {instances.map((arr1, i) => {
        return arr1.map((val, j) => {
          console.log('' + i + ' ' + j)
          return <InstancedRock position={[1.5 * i - 50, 0, 1.5 * j - 50]} />
        })
      })} */}

      <OrbitControls />
      {/* <Sparkles count={scale.length} size={scale} position={[0, 0.9, 0]} scale={[4, 1.5, 4]} speed={0.3} /> */}
      {/* <Stats /> */}
      <Environment preset="dawn" background blur={0.6} />
    </Canvas>
  )
}
